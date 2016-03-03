class Journey < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_many :diary_entries
  has_many :photos, :as => :imageable
  has_many :tags, :as => :taggable

  accepts_nested_attributes_for :photos, reject_if: :all_blank, allow_destroy: true
end
