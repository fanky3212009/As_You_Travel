class PhotosController < ApplicationController
  layout "profile"

  def index
    @user = User.find(params[:user_id])
    @journeys = Journey.where(owner_id: @user.id)
  end

  def create
    # if photo_params[:imageable_type] == DiaryEntry
    # @diary_entry = DiaryEntry.find(photo_params[:imageable_id])
    if photo_params[:imageable_id].length > 0

      @photo = Photo.new(photo_params)
      @photo.picture = params[:file]
      @photo.save

      render nothing: true, status: 200
    else
      @journey = Journey.last
      @photo = @journey.photos.build(photo_params)
      @photo.picture = params[:file]
      @photo.save
      render nothing: true, status: 200
    end
    # redirect_to journey_diary_entry_path(@diary_entry.journey, @diary_entry)
  end


  def show
    @user = Journey.find(params[:journey_id]).owner
    @photo = Photo.find(params[:id])
    @comment = Comment.new

  end

  def update
    @journey = Journey.find(params[:journey_id])
    @photo = Photo.find(params[:id])
    @journey.set_feat_img(@photo)
    @journey.save
    redirect_to @journey
    #code
  end


  def photo_params
    params.require(:photo).permit(:imageable_id, :imageable_type, :name, :picture)#code
  end
end
