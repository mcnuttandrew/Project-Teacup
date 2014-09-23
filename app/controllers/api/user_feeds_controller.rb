module Api
  class UserFeedsController < ApplicationController
    before_action :require_logged_in
  
    def show
      @feed = current_user.get_feed(20)
      # render :feed
      respond_to do |format|
        format.json {render :show}
        format.html {render :feed}

      end
    end    
  end
end