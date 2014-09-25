json.(@post, :id, :content, :user_id, :created_at, :updated_at)

@user = @post.user
json.(@user, :id, :username, :created_at, :updated_at)

coms = (@post.comments ? @post.comments : nil)
json.comments(coms) do |comment|
  json.(comment, :id, :content, :user_id, :created_at, :updated_at)
  user = comment.user
  json.(user, :id, :username, :created_at, :updated_at)
  
end
