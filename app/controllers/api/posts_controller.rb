module Api
  class PostsController < ApplicationController
    def new
      @post = Post.new
      render :new
    end
  
    def create
      @post = current_user.posts.new(post_params)
      if @post.save
        render json: @post
      else
        flash.now[:errors] = @post.errors.full_messages
        render :new
      end
    end
  
    def destroy
      @post = Post.find_by_id(params[:id])
      @post.destroy
      render json: @post
      # redirect_to user_url(current_user)
    end
    
    def show
      @post = Post.find_by_id(params[:id])
      render :show 
    end
  
    def index
      @posts = Post.all
      render :index
    end
  
    private
    def post_params
      params.require(:post).permit(:content, :user_id, :latitude, :longitude)
    end
  end
end