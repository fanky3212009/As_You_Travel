class DiaryEntriesController < ApplicationController
  before_action :find_journey

  def new
    # @journey = Journey.find(params[:journey_id])
    @diary_entry = @journey.diary_entries.build
  end


  def create
    # @journey = Journey.find(params[:journey_id])
    @diary_entry = @journey.diary_entries.build(diary_entry_params)

    if @diary_entry.save
      redirect_to journey_diary_entries_path, notice: "Diary successfully created!"
    else
      render :new
    end

  end

  def index
    # @journey = Journey.find(params[:journey_id])
    @diary_entries = @journey.diary_entries


    # @diary_entry1 = DiaryEntry.find(6)
    # @diary_entry2 = DiaryEntry.find(8)
    # @diary_entry3 = DiaryEntry.find(7)
    #
    # @diary_entryA = []
    #
    # @diary_entryA.push(@diary_entry1)
    # @diary_entryA.push(@diary_entry2)
    # @diary_entryA.push(@diary_entry3)

    respond_to do |format|
      format.html
      format.json { render json: @diary_entries }
    end
  end

  def show
    @diary_entry = @journey.diary_entries.find(params[:id])
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
    @diary_entry = DiaryEntry.find(params[:id])

    if @diary_entry.update_attributes(diary_entry_params)
      redirect_to journey_diary_entry_path(@diary_entry.journey, @diary_entry)
    else
      render :edit
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
          .permit(:title, :location, :date, :content, :recommendation, :latitude, :longitude)
  end
end
