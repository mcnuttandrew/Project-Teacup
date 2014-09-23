module Api
  class FollowshipsController < ApplicationController
    def create
      @follow = current_user.out_follows.create!(followee_id: params[:user_id])
      redirect_to request.referrer
    end
  
    def destroy
      @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
      @follow.destroy!
      redirect_to request.referrer 
    end
  
    private
    def followships_params
      params(:require).permit(:follower_id, :followee_id)
    end
  end
end