class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, :email, uniqueness: true 
  
  after_initialize :ensure_session_token
  
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :in_follows, class_name: "Followship", foreign_key: "followee_id"
  has_many :out_follows, class_name: "Followship", foreign_key: "follower_id"
  has_many :followers, through: :in_follows, source: :follower
  has_many :followees, through: :out_follows, source: :followee
  
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password) 
    user
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end
  
  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
  
end
