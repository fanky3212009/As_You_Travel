class FavouritesController < ApplicationController
  def create
    if params[:diary_entry_id]
      @diary_entry = DiaryEntry.find(parmas[:diary_entry_id])
      @favourite = @diary_entry.favourites.build(params)
    else
      @journey = Journey.find(params[:journey_id])
      @favourite = @journey.favourites.build(params)

  end

  def destroy
    #code
  end
end
