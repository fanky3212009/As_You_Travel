class Favourite < ActiveRecord::Base
  belongs_to :favourable, polymorphic: true
  belongs_to :users


  def self.most_favourited_diaries

    diary_id_array = Favourite.where(favourable_type: DiaryEntry)
                          .group(:favourable_id)
                          .order("count_all DESC").count

    @favourite_diaries = []

    diary_id_array.each do |x|
      @favourite_diaries << DiaryEntry.find(x[0])
    end
    @favourite_diaries
  end


  def self.most_favourable_user
    most_favourable_stat = Favourite.group(:favourable_type, :favourable_id).order("count_all DESC").count.first
    if most_favourable_stat != nil
      most_favourable_class = most_favourable_stat[0][0].constantize
      most_favourable_obj = most_favourable_class.find(most_favourable_stat[0][1])
      if most_favourable_class == Journey
        most_favourable_user = most_favourable_obj.owner
      elsif most_favourable_class == DiaryEntry
        most_favourable_user = most_favourable_obj.journey.owner
      end
      count = most_favourable_stat[1]
      [most_favourable_user, count]
    else
      []
    end
  end

end
