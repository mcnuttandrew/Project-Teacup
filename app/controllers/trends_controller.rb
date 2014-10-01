require 'csv'
module Api
  class TrendsController < ApplicationController
    def show
      get_trending(Date.today.to_s)
      render json: @trending_words
    end
    
    def select
      get_trending(params[:date])
      render json: @trending_words
    end
    
    def over_time
      # dates = Date.parse(params[:start_date]).step(Date.parse(params[:end_date]) ).to_a
      dates = (5.days.ago.to_date).step(Date.today ).to_a
      top_collect = []
      word_collect = []
      dates.each do |date|
        get_trending(date.to_s)
        top_collect << [date.to_s, @trending_words]
        word_collect << @trending_words
      end
      word_collect = word_collect.flatten.select{|word| word.class == String}
      multiples = [];
      
      
      word_collect.each do |word|
        if word_collect.count(word) > 1
          multiples << word
        end
      end 
      
      render json: [top_collect, multiples.uniq]
    end
    
    private
    
    def get_trending(date)
      common_words = []
      CSV.foreach("db/most_common_words.csv") do |row|
        common_words << row
      end
      common_words = common_words.flatten
      common_words = common_words.map{|word| word.downcase}
      @posts = Post.all
      counts = Hash.new        
      @posts.each do |post|
        post.content.split(/\s|\.|\,|\?/).each do |word|
          wrd = word.downcase
          unless common_words.include?(wrd) || wrd.length < 1
            if Date.parse(date).mjd > post.date.mjd
              val = 100/( (Date.parse(date).mjd - post.date.mjd)) 
              counts[wrd] ? counts[wrd] += val : counts[wrd] = val
            end
          end
        end
      end
      sorted_keys = counts.sort_by{|word, score| score}.reverse
      @trending_words = sorted_keys.slice(0, 10);
    end
  end
end