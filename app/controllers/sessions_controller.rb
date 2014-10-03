class SessionsController < ApplicationController
  
  def new
    if logged_in?
      redirect_to "/"
    else
      render :new
    end
  end
  
  def create

    user = User.find_by_credentials(
      params[:user][:username].downcase,
      params[:user][:password].downcase
    )
    
    if user
      login(user)
      redirect_to "/"
    else
      flash.now[:errors] = ["Invalid Username/Password Combination"]
      render :new
    end
  end
  
  def destroy
    logout
    redirect_to new_session_url
  end
end
