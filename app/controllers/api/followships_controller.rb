module Api
  class FollowshipsController < ApplicationController
    def create
      @follow = current_user.out_follows.create!(followee_id: params[:user_id])
      redirect_to request.referrer
    end
  
    def show
      @follows = Followship.find(followship_params)
      # fail3
      render json: @follows
    end
  
    def destroy
      @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
      @follow.destroy!
      render json: @follow
      # redirect_to request.referrer
    end
  
    private
    def followships_params
      params(:require).permit(:follower_id, :followee_id)
    end
  end
end