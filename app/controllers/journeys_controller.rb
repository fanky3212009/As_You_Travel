class JourneysController < ApplicationController
  # layout "profile"
  # except: [:index]
  before_action :set_journey, only: [:show, :edit, :update, :destroy, :gallery]
  before_action :require_login, only: [:edit, :new, :create, :update, :destroy]

  def index
      @journeys = Journey.all
      @user = User.find(params[:user_id])

      respond_to do |format|
        format.html
        format.json { render json: @journeys }
      end

  end

  def new
    @journey = Journey.new
    @user =  current_user
  end

  def show
    @diary_entries = @journey.diary_entries
    @comment = Comment.new
    @user = @journey.owner
  end

  def gallery
    @user = @journey.owner
  end

  def edit
  end

  def create
    if journey_params.has_key?("description")
      @journey = Journey.last
      @journey.update_attributes(journey_params)
      @journey.save
      render nothing: true, status: 200
    else

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
          .permit(:title, :description, :location, :start_date, :end_date, :feat_img, :imageable_id, :imageable_type, :name, :picture, :file, :latitude, :longitude)

  end
end
