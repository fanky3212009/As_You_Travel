class Photo < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true
  has_many :tags, :as => :taggable
  mount_uploader :picture, PictureUploader
  has_many :comments, as: :commentable

  def find_journey_of_photo
    if self.imageable.class == Journey
      self.imageable
    else
      self.imageable.journey
    end
  end

end
