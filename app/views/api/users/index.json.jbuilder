json.array!(@users) do |user|
  json.(user, :id, :username, :created_at, :updated_at)
end
