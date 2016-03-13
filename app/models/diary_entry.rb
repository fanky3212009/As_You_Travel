class DiaryEntry < ActiveRecord::Base
  belongs_to :journey
  has_many :photos, :as => :imageable
  has_many :favourites, :as => :favourable
  has_many :tags, :as => :taggable

  has_many :comments, :as => :commentable
  validates :title, :location, :date, :recommendation, presence: true

  # attr_accessor :location, :longitude, :latitude
  geocoded_by :location
  after_validation :geocode

  def show_time(created_at)
    created_at.strftime('%b %e %Y %H :%M :%S %p')
  end

end
