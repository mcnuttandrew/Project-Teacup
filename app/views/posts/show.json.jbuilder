json.(@post, :id, :content, :user_id, :created_at, :updated_at)

coms = (@post.comments ? @post.comments : nil)
json.coms(coms) do |comment|
  json.(comment, :id, :content, :user_id, :created_at, :updated_at)
end
