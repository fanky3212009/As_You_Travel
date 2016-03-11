class Tag < ActiveRecord::Base
  belongs_to :taggable, polymorphic: true
  belongs_to :user


  def self.most_recommended_user
    most_recommended_stat = Tag.where("body LIKE ?", "recommended").group(:taggable_type, :taggable_id).count().sort_by{|k, v| v}.reverse.first
    most_recommended_class = eval(most_recommended_stat[0][0])
    most_recommended_obj = most_recommended_class.find(most_recommended_stat[0][1])
    most_recommended_user = most_recommended_obj.owner
    count = most_recommended_stat[1]
    return [most_recommended_user, count]
  end
end
