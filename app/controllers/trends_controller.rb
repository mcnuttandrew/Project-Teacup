module Api
  class TrendsController < ApplicationController
    def show
       @posts = Post.all
       counts = Hash.new        
       @posts.each do |post|
         post.content.split(" ").each do |word|
           counts[word] ? counts[word] += 1 : counts[word] = 1
           ##algorithm happens here
         end
       end
       sorted_keys = counts.sort_by{|word, count| count}.reverse
       @trending_words = sorted_keys.slice(0, 10);
       render json: @trending_words
    end
  end
end