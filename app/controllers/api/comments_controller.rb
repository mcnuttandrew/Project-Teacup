module Api
  class CommentsController < ApplicationController
    def create
      @post = Post.find_by_id(params[:post_id])
      @comment = @post.comments.new(comment_params)
      @comment.user_id = current_user.id
      @comment.save

      flash.now[:errors]= @comment.errors.full_messages
      # redirect_to user_url(@post.user_id) 
      render json: @comment
    end
  
    def destroy
      @comment = Comment.find_by_id(params[:id])
      return_address = @comment.post.user_id
      @comment.destroy
      # redirect_to user_url(return_address)/
      render json: @comment
    end
    
    def comment
      @comment = Comment.find_by_id(params[:id])
      render json: @comment
    end
  
    private
    def comment_params
      params.require(:comment).permit(:user_id, :post_id, :content)
    end
  end
end
