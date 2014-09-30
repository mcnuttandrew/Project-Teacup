require 'nokogiri'
require 'open-uri'
require 'csv'
#
words_list = 'http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/PG/2006/04/1-10000'
words = []
doc = Nokogiri::HTML(open(words_list))
doc.css('a').each do |node|
  words << node.text.strip  
end
words = words.slice(5, 1005)
words.concat(["i'm", "we're","don't", "lot", "doesn't", "it's", "also", "apparently", "somewhere"])
words.concat(["somehow", "guy", "someone", "wasn't", "there's"])

CSV.open("db/most_common_words.csv", "w") do |csv|
  csv << words
end

p words.length 