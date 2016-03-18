class UserSessionsController < ApplicationController
  layout false
  def new
     @user = User.new
  end

  def create
    if @user = login(params[:email], params[:password], params[:remember])
      redirect_to(root_url, notice: 'Login successful')
    else
      flash.now[:alert] = 'Login failed'
      redirect_to :login
    end
  end

  def destroy
    logout
    redirect_to(:users, notice: 'Logged out!')
  end
end
