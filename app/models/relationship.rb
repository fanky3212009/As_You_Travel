class Relationship < ActiveRecord::Base
  belongs_to :follower, class_name: "User"
  belongs_to :followed, class_name: "User"
  validates :follower_id, presence: true
  validates :followed_id, presence: true

  def self.most_followed_user
    most_followed_stat = Relationship.group(:followed_id).order("count_all DESC").count.first
    if most_followed_stat!= nil
    most_followed_user = User.find(most_followed_stat[0])
    followed_number = most_followed_stat[1]
    [most_followed_user, followed_number]
    end
  end
end
