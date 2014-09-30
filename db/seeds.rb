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

##follows
collect = []
gen  = Rubystats::NormalDistribution.new(45, 25)
500.times do |follow|
  pair = [(gen.rng).floor+1, (gen.rng).floor+1];
  if pair[0] != pair[1] && (! collect.include?(pair)) 
    if (1..90).to_a.include?(pair[0])  && (1..90).to_a.include?(pair[1])
      collect << pair
    end
  end
end

collect.each do |pair|
  p pair
  Followship.create!({followee_id: pair[0], follower_id: pair[1]})
end

##posts
results.flatten.each do |line|
  puts [line, line.length]
  date = "2014-#{rand(11)+1}-#{rand(27)+1}"
  if line.length > 4
    Post.create!({
      user_id: (gen.rng).floor+1,
      content: line,
      date: date, 
      longitude: Faker::Address.latitude,
      latitude: Faker::Address.longitude,
      dream_longitude: Faker::Address.latitude,
      dream_latitude: Faker::Address.longitude
    })
  end
end