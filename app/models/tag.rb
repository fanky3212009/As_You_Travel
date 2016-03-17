class Tag < ActiveRecord::Base
  belongs_to :taggable, polymorphic: true
  belongs_to :user


  def self.most_recommended_user
    most_recommended_stat = Tag.where("body LIKE ?", "recommended").group(:taggable_type, :taggable_id).count().sort_by{|k, v| v}.reverse.first
    if most_recommended_stat != nil
      most_recommended_class = eval(most_recommended_stat[0][0])
      most_recommended_obj = most_recommended_class.find(most_recommended_stat[0][1])
      if most_recommended_obj.class == Journey
        most_recommended_user = most_recommended_obj.owner
      else
        most_recommended_user = most_recommended_obj.journey.owner
      end
      count = most_recommended_stat[1]
      [most_recommended_user, count]
    else
      [User.first]
    end
  end
end
