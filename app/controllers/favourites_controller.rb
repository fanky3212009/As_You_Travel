class FavouritesController < ApplicationController
  layout 'profile', only: [:index]
  def index
    @user = current_user
    @favourites = @user.favourites
    @search_results = Favourite.most_favourited_diaries
    # if params[:search]
    #   @search_results = @search_results.select {|d| d.title.include?params[:search]}
    # end

    respond_to do |format|
      format.html
      format.js
    end
  end


  def create
    @user = current_user
    if params[:diary_entry_id]
      @diary_entry = DiaryEntry.find(params[:diary_entry_id])
      @favourite = @diary_entry.favourites.build

    else
      @journey = Journey.find(params[:journey_id])
      @favourite = @journey.favourites.build
    end

    @favourite.user_id = @user.id

    if @favourite.save
      respond_to do |format|
          format.html
          format.json {render json: @favourite}
      end
    end


  end

  def destroy
    @favourite = Favourite.find(params[:id])
    @favourite.destroy
    respond_to do |format|
      format.html
      format.json {render json: @favourite}
  end

  end

  # private
  # def favourite_params
  #   params.require(:favourite).permit(:favourable_id, :favourable_id)
  #   #code
  # end
end
