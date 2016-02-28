class Journey < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_many :diary_entries
end
