json.array!(@users) do |user|
  json.(user, :id, :username, :created_at, :updated_at)

  followed = user.followees
  json.followed(followed) do |use|
    json.(use, :id)
  end

  followers = user.followers
  json.followers(followers) do |use|
    json.(use, :id)
  end
end
