json.array!(@feed) do |post|
  json.(post, :id, :content, :user_id, :created_at, :updated_at)
end
