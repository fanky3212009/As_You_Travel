class JourneysController < ApplicationController
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
      @user = User.find(session[:user_id])
      @journey = @user.owend_journeys.build(journey_params)

      if @journey.save
        redirect_to :user, notice: "Journey successfully created!"
      else
        render :new
      end
    end
  end

  private
  def journey_params
    params.require(:journey)
          .permit(:title, :description, :location, :start_date, :end_date, :feat_img)
  end
end
