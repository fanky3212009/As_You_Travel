class JourneysController < ApplicationController

  layout "photo_layout", only: [:gallery]

  before_action :set_journey, only: [:show, :edit, :update, :destroy, :gallery]
  before_action :require_login, only: [:edit, :new, :create, :update, :destroy]

  def index
      @user = User.find(params[:user_id])
      @journeys = @user.owend_journeys.order(:start_date)

      respond_to do |format|
        format.html {  render layout: "journey_layout"}
        format.json { render json: @journeys }
      end

  end

  def new
    @journey = Journey.new
    @user =  current_user
  end

  def show
    @diary_entries = @journey.diary_entries.order('date')
    @comment = Comment.new
    @user = @journey.owner
  end

  def gallery
    @user = @journey.owner
    @comment = Comment.new
  end

  def edit
  end

  def create
    if journey_params[:title] == Journey.last.title
      render nothing: true
    else
      if journey_params.has_key?("description")
        if journey_params[:description].size > 0
          @journey = current_user.owend_journeys.last
          @journey.update_attributes(journey_params)
          @journey.save
          render nothing: true, status: 200
        else
          render nothing: true
          flash[:alert] = "Description Cannot be Blank!"
        end
      else

        if current_user
          @user = current_user
          @journey = @user.owend_journeys.build(journey_params)

          if @journey.save
            @journey.set_feat_img
            redirect_to @journey, notice: "Journey successfully created!"
          else
            render :new
          end
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
