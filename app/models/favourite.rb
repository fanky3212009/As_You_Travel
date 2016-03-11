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

end
