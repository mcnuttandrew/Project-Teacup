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
      analyze_period(nil)
      render json: @output 
    end
    
    def over_trend
      analyze_period(params[:date])
      render json: @output
    end
    
    private
    
    def analyze_period(start_date)
      if start_date && (Date.parse(start_date) <= Date.today)
        dates = (Date.parse(start_date)).step(Date.parse(start_date) + 4 ).to_a
      else 
        dates = (Date.today-4).step(Date.today).to_a
      end
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
      
      @output = [top_collect, multiples.uniq]
    end
    
    def get_trending(date)
      common_words = []
      CSV.foreach("db/most_common_words.csv") do |row|
        common_words << row
      end
      common_words = common_words.flatten
      common_words = common_words.map{|word| word.downcase}
      
      #posts
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
      
      #comments
      @comments = Comment.all
      @comments.each do |comment|
        comment.content.split(/\s|\.|\,|\?/).each do |word|
          wrd = word.downcase
          unless common_words.include?(wrd) || wrd.length < 1
            comment_date = comment.created_at.to_date
            if Date.parse(date).mjd > comment_date.mjd
              val = 100/( (Date.parse(date).mjd - comment_date.mjd)) 
              counts[wrd] ? counts[wrd] += val : counts[wrd] = val
            elsif
              val = 10
              counts[wrd] ? counts[wrd] += val : counts[wrd] = val
            end
          end
        end
      end
      
      #yield
      sorted_keys = counts.sort_by{|word, score| score}.reverse
      @trending_words = sorted_keys.slice(0, 10);
    end
  end
end