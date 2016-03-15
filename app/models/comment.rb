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

  def show_time(created_at)
    created_at.strftime('%b %e %Y %H :%M :%S %p')
  end
  
end
