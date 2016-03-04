class PhotosController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @journeys = Journey.where(owner_id: @user.id)
  end

  def create
    # if photo_params[:imageable_type] == DiaryEntry
    # @diary_entry = DiaryEntry.find(photo_params[:imageable_id])
    @photo = Photo.new(photo_params)
    @photo.picture = params[:file]
    @photo.save

    render nothing: true, status: 200

    # redirect_to journey_diary_entry_path(@diary_entry.journey, @diary_entry)
  end


  def show
    @photo = Photo.find(params[:id])
    @comment = Comment.new

  end

  def photo_params
    params.require(:photo).permit(:imageable_id, :imageable_type, :name, :picture)#code
  end
end
