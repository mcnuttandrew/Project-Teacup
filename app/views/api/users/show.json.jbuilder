json.(@user, :id, :username, :created_at, :updated_at)

followed = @user.followees
json.followed(followed) do |use|
  json.(use, :id, :username, :created_at, :updated_at)
end

followers = @user.followers
json.followers(followers) do |use|
  json.(use, :id, :username, :created_at, :updated_at)
end

tweets = @user.posts
json.tweets(tweets) do |tweet|
  json.(tweet, :id, :content, :user_id, :latitude, :longitude, :created_at, :updated_at)
end
