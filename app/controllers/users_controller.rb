class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :followings, :followers]
  before_action :require_login, only: [:index, :edit, :update, :destroy, :following, :followers]


  def index
    @users = User.all
  end


  def show
    # @journeys = @user.journeys
    respond_to do |format|
      format.html
      format.json
    end
  end


  def new
    @user = User.new
  end


  def edit
  end


  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def followings
    @users = @user.followings
    render 'show_follow'
  end

  def followers
    @users = @user.followers
    render 'show_follow'
  end


  private

    def set_user
      @user = User.find(params[:id])
    end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
