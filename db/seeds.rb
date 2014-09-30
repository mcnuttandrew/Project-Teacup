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
92.times do |user|
  name = Faker::Internet.user_name
  users <<  name unless users.include?(name)
  puts name
  User.create!({username: name, password: "pass_word"})
end

##follows
collect = []
500.times do |follow|
  pair = [rand(users.length-1)+1, rand(users.length-1)+1];
  if pair[0] != pair[1] && (! collect.include?(pair))
    collect << pair
  end
end

collect.each do |pair|
  p pair
  Followship.create!({followee_id: pair[0], follower_id: pair[1]})
end

##posts
results.flatten.each do |line|
  puts [line, line.length]
  if line.length > 4
    Post.create!({
      user_id: rand(92),
      content: line,
      longitude: Faker::Address.latitude,
      latitude: Faker::Address.longitude,
      dream_longitude: Faker::Address.latitude,
      dream_latitude: Faker::Address.longitude
    })
  end
end