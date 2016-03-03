class Journey < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_many :diary_entries
  has_many :photos, :as => :imageable
  has_many :tags, :as => :taggable
end
