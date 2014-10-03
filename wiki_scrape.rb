require 'open-uri'
require 'csv'
#
epsiodes_list = 'http://theinfosphere.org/Episode_Transcript_Listing'
episodes = []
doc = Nokogiri::HTML(open(epsiodes_list))
doc.css('a').each do |node|
  if(/Transcript\:/.match(node))
    episodes << "http://theinfosphere.org/#{node.children.text.strip.gsub(" ", "_")}"
  end
end