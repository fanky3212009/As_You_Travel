class Photo < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true
  mount_uploader :picture, PictureUploader
  has_many :comments, :as => :commentable

end
