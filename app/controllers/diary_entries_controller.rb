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
  end

  def show
    @diary_entry = @journey.diary_entries.find(params[:id])
  end

  def edit

  end

  def update
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
          .permit(:title, :location, :date, :content, :recommendation)
  end
end
