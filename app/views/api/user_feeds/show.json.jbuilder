json.array!(@feed) do |post|
  json.(post, :id, :content, :latitude, :longitude, :user_id, :created_at, :updated_at)
end
