class PostsController < ApplicationController
  
  def new
    @post = Post.new
    render :new
  end
  
  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      redirect_to user_url(current_user)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end
  
  def destroy
    @post = Post.find_by_id(params[:id])
    @post.destroy
    redirect_to user_url(current_user)
  end
    
  def show
    @post = Post.find_by_id(params[:id])
    render :show
  end
  
  #just shows current users posts?
  def index
    @posts = Post.all
    render :index
  end
  
  private
  def post_params
    params.require(:post).permit(:content, :user_id)
  end
end
