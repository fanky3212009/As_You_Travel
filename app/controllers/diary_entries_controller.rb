class DiaryEntriesController < ApplicationController
  # layout "profile", only: [:index]
  before_action :find_journey

  def new
    # @journey = Journey.find(params[:journey_id])
    @diary_entry = @journey.diary_entries.build
  end


  def create
    if diary_entry_params[:title] == DiaryEntry.last.title
      render nothing: true
    else

      if params.has_key?("content")
        @diary_entry = DiaryEntry.last
        @diary_entry.update_attributes({:content => params[:content]})
        @diary_entry.save
        render nothing: true, status: 200
      else
          if diary_entry_params[:imageable_type]
            @diary_entry = current_user.last_diaries.last
            @photo = @diary_entry.photos.build(diary_entry_params)
            @photo.picture = params[:file]
            @photo.save
            render nothing: true, status: 200
          else
            @diary_entry = @journey.diary_entries.build(diary_entry_params)

            if @diary_entry.save
              respond_to do |format|
                format.html {redirect_to journey_diary_entries_path, notice: "Diary successfully created!"}
                format.json { render nothing: true, status: 200}
              end

            else
            render :new
            end
        end
      end
    end
  end

  def index
    @user = @journey.owner
    # @journey = Journey.find(params[:journey_id])
    @diary_entries = @journey.diary_entries

    respond_to do |format|
      format.html
      format.json { render json: @diary_entries }
    end
  end

  def show
    @diary_entry = @journey.diary_entries.find(params[:id])
    @user = @journey.owner
    @comment = Comment.new
    respond_to do |format|
      format.html
      format.json { render json: {latitude: @diary_entry.latitude, longitude: @diary_entry.longitude} }
    end
  end

  def edit
    @diary_entry = DiaryEntry.find(params[:id])
  end

  def update
    if params.has_key?("content")
      @diary_entry = DiaryEntry.find(params[:id])
      @diary_entry.update_attributes({:content => params[:content]})
      @diary_entry.save
      render nothing: true, status: 200
    else
      @diary_entry = DiaryEntry.find(params[:id])

      if @diary_entry.update_attributes(diary_entry_params)
        respond_to do |format|
          format.html {redirect_to journey_diary_entry_path(@diary_entry.journey, @diary_entry), notice: "Diary successfully created!"}
          format.json { render nothing: true, status: 200}
        end
      else
        render :edit
      end
    end

  end

  def destroy
    if current_user.id == @journey.owner_id
      @diary_entry = @journey.diary_entries.find(params[:id])
      @diary_entry.destroy
    end
    redirect_to journey_diary_entries_path(@journey.id)
  end

  def find_journey
    @journey = Journey.find(params[:journey_id])

  end

  private
  def diary_entry_params
    params.require(:diary_entry)
          .permit(:title, :location, :date, :content, :recommendation, :latitude, :longitude, :imageable_id, :imageable_type)
  end
end
