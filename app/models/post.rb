class Post < ActiveRecord::Base
  validates :content, presence: true
  validates :content, length: {minimum: 1, maximum: 250}
  
  belongs_to :user
  has_many :comments
  default_scope {order :id => :desc}
end
