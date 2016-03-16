class Journey < ActiveRecord::Base

  belongs_to :owner, class_name: "User"
  has_many :diary_entries
  has_many :photos, :as => :imageable
  has_many :favourites, :as => :favourable
  has_many :tags, :as => :taggable
  has_many :comments, :as => :commentable
  # validates :title, :description, :location, presence: true



  def photo_gallery
    @photo_gallery = []
    @photo_gallery.concat(self.photos)
      self.diary_entries.each do |y|
         @photo_gallery.concat(y.photos)
       end
    @photo_gallery
  end

  def set_feat_img(photo)
      self.feat_img = photo.picture.public_id
  end

  def set_description
    @journey = Journey.last
    @journey.description = params[:description]
    @journey.save
  end

  def show_time(created_at)
    created_at.strftime('%b %e %Y %H :%M :%S %p')
  end

  geocoded_by :location
  after_validation :geocode

end
