class User < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes["password"] }
  validates :password, confirmation: true, if: -> { new_record? || changes["password"] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes["password"] }

  validates :email, uniqueness: true

  has_many :owend_journeys, class_name: "Journey", foreign_key: "owner_id"
  has_many :photos, :as => :imageable

  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :followings, through: :active_relationships, source: :followed_id

  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower_id

  def follow(another_user)
    self.active_relationships.create(followed_id: another_user.id)
  end

  def unfollow(another_user)
    self.active_relationships.find_by(followed_id: another_user.id).destroy
  end

  def follow?(another_user)
    self.followings.include?(another_user)
  end

end
