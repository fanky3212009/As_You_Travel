class PhotosController < ApplicationController

  def create
    @diary_entry = DiaryEntry.find(photo_params[:imageable_id])
    @photo = Photo.new(photo_params)
    # @photo.picture = params[:file]

    @photo.save

    redirect_to journey_diary_entry_path(@diary_entry.journey, @diary_entry)
    #code
  end

  def photo_params
    params.require(:photo).permit(:imageable_id, :imageable_type, :name, :picture, :picture_cache)#code
  end
end
