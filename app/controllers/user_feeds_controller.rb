class UserFeedsController < ApplicationController
  def show
    @posts = current_user.posts
    current_user.followees.each do |fol|
      @posts.concat(fol.posts)
    end
    render :feed
  end    
end
