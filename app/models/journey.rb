class Journey < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_many :diary_entries
  has_many :photos, :as => :imageable

  has_many :tags, :as => :taggable
  has_many :comments, :as => :commentable

  def photo_gallery
    @photo_gallery = []
    @photo_gallery.concat(self.photos)
      self.diary_entries.each do |y|
         @photo_gallery.concat(y.photos)
      end
    @photo_gallery
  end

  def set_profile_img
      self.feat_img = self.photo_gallery.sample.picture.url
    end

  geocoded_by :location
  after_validation :geocode

end
