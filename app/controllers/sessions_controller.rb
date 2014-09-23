class SessionsController < ApplicationController
  
  def new
    redirect_to user_feed_url unless logged_in?
    render :new
  end
  
  def create
    redirect_to user_feed_url unless logged_in?
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    
    if user
      login(user)
      redirect_to user_feed_url
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
