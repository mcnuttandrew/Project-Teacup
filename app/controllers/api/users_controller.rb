module Api 
  class UsersController < ApplicationController
    def new
      @user = User.new
      render :new
    end

    def create
      @user = User.new(user_params)
      if @user.save
        login(@user)
        redirect_to root_url
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end

    def show
      @user = User.find(params[:id])
      render :show
    end

    def index
      @users = User.includes(:followees, :followers).all
      render :index
    end
    
    def search
      if params[:query].present?
        # @users = User.where("username ~ ?", params[:query])
        @users = User.where("lower(username) ~ ?", params[:query].downcase)
      else
        @users = User.none
      end
      render json: @users
    end

    private
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end  
  end
end