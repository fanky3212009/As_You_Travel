class PhotosController < ApplicationController

  def create
    # if photo_params[:imageable_type] == DiaryEntry
    @diary_entry = DiaryEntry.find(photo_params[:imageable_id])
    @photo = Photo.new(photo_params)
    @photo.picture = params[:file]
    @photo.save

    redirect_to journey_diary_entry_path(@diary_entry.journey, @diary_entry)
  end
    # @photo.picture = params[:file]
      #
      # respond_to do |format|
      #   if @photo.save
      #     format.html
      #     format.json { render json: @photo }
      #   else
      #     format.html
      #     format.json
      #   end
      #
      # end
    # end




      #code

  def photo_params
    params.require(:photo).permit(:imageable_id, :imageable_type, :name, :picture)#code
  end
end
