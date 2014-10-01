class Comment < ActiveRecord::Base
  validates :user_id, :post_id, :content, presence: true
  default_scope {order(:id)}
  belongs_to :post
  belongs_to :user
end

