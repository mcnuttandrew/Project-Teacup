module Api
  class UserFeedsController < ApplicationController
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
      @feed = current_user.get_feed(20)
      # render :feed
      respond_to do |format|
        format.json {render :show}
        format.html {render :feed}

      end
    end 
    
    private
    def post_params
      params.require(:post).permit(:content, :user_id)
    end     
  end
end