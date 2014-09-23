class UserFeedsController < ApplicationController
  def show
    @feed = current_user.get_feed(20)
    render :feed
  end    
end
