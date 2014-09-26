module Api
  class MainFeedsController < ApplicationController
    before_action :require_logged_in
  
    def create
      @post = current_user.posts.new(post_params)
      if @post.save
        redirect_to api_post_url(@post) 
      else
        flash.now[:errors] = @post.errors.full_messages
        render :new
      end
    end
  
    def show
      @posts = Post.all.shuffle
      render :show
    end 
    
    private
    def post_params
      params.require(:post).permit(:content, :user_id)
    end     
  end
end