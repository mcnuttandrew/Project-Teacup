# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'faker'
require 'csv'

results = []
CSV.foreach("db/dreams.csv") do |row|
    results << row
end

##users
users = []
90.times do |user|
  name = Faker::Internet.user_name
  users <<  name unless users.include?(name)
  puts name
  User.create!({username: name, password: "pass_word"})
end

User.create!({username: "guest", password: "password"})

##follows
collect = []
gen  = Rubystats::NormalDistribution.new(45, 25)
500.times do |follow|
  pair = [(gen.rng).floor+1, (gen.rng).floor+1];
  if pair[0] != pair[1] && (! collect.include?(pair)) 
    if pair[0] > 0  && pair[1] > 0 && pair[0] < 90 && pair[1] < 90
      collect << pair
    end
  end
end

collect.each do |pair|
  p pair
  Followship.create!({followee_id: pair[0], follower_id: pair[1]})
end

latLangs = []
CSV.foreach("db/latlang.csv") do |row|
    latLangs << row
end
latLangs = latLangs.flatten
cleanedLatLangs = []
(latLangs.length/2).times do |index|
  cleanedLatLangs << [latLangs[2 * index].to_f, latLangs[2 * index + 1].to_f]
end

# latLangs = latLangs.flatten
# cleanedLatLangs = []
# latLangs.each {|pair| cleanedLatLangs << [pair[0].to_f, pair[1].to_f]}



##posts
results.flatten.each do |line|
  puts [line, line.length]
  date = "2014-#{rand(9)+1}-#{rand(27)+1}"
  if line.length > 4
    loc = cleanedLatLangs.sample
    dream_loc = cleanedLatLangs.sample
    userid = ((gen.rng).floor+1).abs
    if userid >= users.length
      userid = (userid / 2).floor
    end
    Post.create!({
      user_id: userid,
      content: line,
      date: date, 
      longitude: loc[1],
      latitude: loc[0],
      dream_longitude: dream_loc[1],
      dream_latitude: dream_loc[0]
    })
  end
end