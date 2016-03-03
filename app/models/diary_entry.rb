class DiaryEntry < ActiveRecord::Base
  belongs_to :journey
  has_many :photos, :as => :imageable
  has_many :tags, :as => :taggable
  # attr_accessor :location, :longitude, :latitude
  geocoded_by :location
  after_validation :geocode

end
