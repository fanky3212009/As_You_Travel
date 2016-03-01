class User < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes["password"] }
  validates :password, confirmation: true, if: -> { new_record? || changes["password"] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes["password"] }

  validates :email, uniqueness: true

  has_many :owend_journeys, class_name: "Journey", foreign_key: "owner_id"
  has_many :photos, :as => :imageable

  def as_json(options={})
    super(#:only => [:first_name,:last_name,:city,:state],
          :include => [
            :owend_journeys #=> {:only => [:title, :description, :start_date, :end_date, :feat_img]}
          ]
    )
  end
end
