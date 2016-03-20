class UsersController < ApplicationController
  layout "profile", except: [:index, :home, :new]
  before_action :set_user, only: [:show, :edit, :update, :destroy, :followings, :followers]
  before_action :require_login, only: [:index, :edit, :update, :destroy, :following, :followers]


  def index
    @users = User.all
    if params[:search]
      @search_results = DiaryEntry.where("lower(title) LIKE ?", "%#{params[:search].downcase}%")
      @search_results = @search_results.concat(Journey.where("lower(title) LIKE ?", "%#{params[:search].downcase}%"))
      @search_results.sort_by! {|result| result.created_at }
      @search_results.reverse!

      respond_to do |format|
        format.html
        format.js
      end
    else
      if current_user.email == "1@1.com"
        render :index
      else
        render file: "#{Rails.root}/public/404.html", layout: false, status: 404

      end
    end
  end


  def show
    @user.set_profile_img

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
        auto_login(@user)
        format.html { redirect_to root_url, notice: 'User was successfully created.' }
        format.json { render :home, status: :created, location: @user }
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

  def home
    @search_results = []

    if params[:search]

      @search_results = DiaryEntry.near(params[:search], 50, unit: :km)
    elsif params[:latitude] && params[:longitude]
      @search_results = DiaryEntry.near([params[:latitude], params[:longitude]], 50, unit: :km)
    else
      @search_results = []
    end


    @diary_entry = DiaryEntry.last
    #
    # current_user.followers.each do |f|
    #   f.journeys.each do |j|
    #     j.diary_entries.last
    #   end

    # end

  end


  private


    def set_user
      @user = User.find(params[:id])
    end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end
end
