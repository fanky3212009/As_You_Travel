class JourneysController < ApplicationController
  before_action :set_journey, only: [:show, :edit, :update, :destroy]
  before_action :require_login, only: [:edit, :new, :create, :update, :destroy]

  def index
    #code
    @journeys = Journey.all
  end

  def new
    #code
    @journey = Journey.new
  end

  def show
  end

  def edit
  end

  def create

    if current_user
      @user = current_user
      @journey = @user.owend_journeys.build(journey_params)

      if @journey.save
        redirect_to @user, notice: "Journey successfully created!"
      else
        render :new
      end
    end
  end

  def destroy
    @journey.destroy
    redirect_to :user
  end

  def update
      if @journey.update_attributes(journey_params)
        redirect_to journey_path(@journey)
      else
        render :edit
      end
  end


  private

  def set_journey
    @journey = Journey.find(params[:id])
  end

  def journey_params
    params.require(:journey)
          .permit(:title, :description, :location, :start_date, :end_date, :feat_img)
  end
end
