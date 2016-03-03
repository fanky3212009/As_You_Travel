class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  def as_json(options={})
    super(#:only => [:first_name,:last_name,:city,:state],
          :include => [
            :user #=> {:only => [:title, :description, :start_date, :end_date, :feat_img]}
          ]
    )
  end
end
