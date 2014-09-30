json.array!(@trending_words) do |word|
  json.(word, :value)
end
