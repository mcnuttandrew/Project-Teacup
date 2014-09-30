require 'csv'

collect = []
File.open("db/drew-diary.txt").each do |line|
  if line.length > 5 && line.length < 250
    collect.push(line.gsub("\n", ""))
  end
end

puts collect.length

CSV.open("dreams.csv", "w") do |csv|
  csv << collect
end