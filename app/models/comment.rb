class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  def as_json(options={})
    super(#:only => [:first_name,:last_name,:city,:state],
          :include => :user
    )
  end
end
