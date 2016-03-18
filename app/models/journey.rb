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

  def set_as_feat_img(photo)
    self.feat_img = photo.picture.public_id
    self.save
  end

  def set_feat_img
    if self.feat_img == "img_placeholder.png"
      if self.photo_gallery.last
        self.feat_img = self.photo_gallery.last.picture.public_id
      end
    else
      self.feat_img = "img_placeholder.png"
    end
    self.save
  end

  def set_description
    @journey = Journey.last
    @journey.description = params[:description]
    @journey.save
  end

  def show_time(created_at)
    created_at.strftime('%b %e %Y')
  end

  geocoded_by :location
  after_validation :geocode

end
