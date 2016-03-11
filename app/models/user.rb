class User < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes["password"] }
  validates :password, confirmation: true, if: -> { new_record? || changes["password"] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes["password"] }

  validates :email, uniqueness: true

  has_many :owend_journeys, class_name: "Journey", foreign_key: "owner_id"
  has_many :photos, :as => :imageable
  has_many :favourites
  has_many :tags


  def as_json(options={})
    super(#:only => [:first_name,:last_name,:city,:state],
          :include => [
            :owend_journeys #=> {:only => [:title, :description, :start_date, :end_date, :feat_img]}
          ]
    )
  end

  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :followings, through: :active_relationships, source: :followed

  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower

  def follow(another_user)
    self.active_relationships.create(followed_id: another_user.id)
  end

  def unfollow(another_user)
    self.active_relationships.find_by(followed_id: another_user.id).destroy
  end

  def follow?(another_user)
    self.followings.include?(another_user)
  end

  def set_profile_img
    if self.photos.last
      self.profile_img = self.photos.last.picture.url
      self.save
    end
    #code
  end

  def find_recommended
    @recommendation = self.tags.where(body: "recommended")
    @reco_array = []
    @recommendation.each { |x| @reco_array << x.taggable}
    @reco_array
  end

  def latest_recommendation
    @tags = self.tags.where(body: "recommended").last(4)
    @tags.map!.each do |r|
        r = r.taggable
    end
    @tags
  end

  def count_places
    diaryArray = []
    self.owend_journeys.each do |x|
      diaryArray.concat(x.diary_entries)
    end
    diaryLocation = []
    diaryArray.each do |d|
      diaryLocation << d.location
    end
    diaryArray.uniq!
    places_sum = diaryArray.count
    places_sum

  end

  def count_diaries
    diaryArray = []
    self.owend_journeys.each do |x|
      diaryArray.concat(x.diary_entries)
    end
    diaryArray.count
  end

  def news_feed
    following_diary_entries = []
    self.followings.each do |following|
      following.journeys.each do |journey|
        following_diary_entries.concat(journey.diary_entries)
      end
    end
    following_diary_entries.order("updated_at DESC").first(4)
  end


  def count_photos
    photosArray = []
    self.owend_journeys.each { |j| photosArray.concat(j.photo_gallery) }
    photosArray.count
  end

  def count_days
    days = 0
    self.owend_journeys.each do |j|
      each_days = ((j.end_date - j.start_date) / 1.day).ceil
      days += each_days
    end
    days
  end

  def self.most_favourable_user
    most_favourable_stat = Favourite.group(:favourable_type, :favourable_id).order("count_all DESC").count.first
    most_favourable_class = most_favourable_stat[0][0].constantize
    most_favourable_obj = most_favourable_class.find(most_favourable_stat[0][1])
    if most_favourable_class == Journey
      most_favourable_user = most_favourable_obj.owner
    elsif most_favourable_class == DiaryEntry
      most_favourable_user = most_favourable_obj.journey.owner
    end
    count = most_favourable_stat[1]
    return [most_favourable_user, count]
  end

  def self.most_recommended_user
    most_recommended_stat = Tag.where("body LIKE ?", "recommended").group(:taggable_type, :taggable_id).count().sort_by{|k, v| v}.reverse.first
    most_recommended_class = eval(most_recommended_stat[0][0])
    most_recommended_obj = most_recommended_class.find(most_recommended_stat[0][1])
    most_recommended_user = most_recommended_obj.owner
    count = most_recommended_stat[1]
    return [most_recommended_user, count]
  end

  def most_followed_user
  end

end
