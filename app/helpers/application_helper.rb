module ApplicationHelper

  def load_commentable
    @klass = eval(controller_name.classify)
    @commentable = @klass.find(params[:id])
    # @commentable_comments_path
    # comments_path(:commentable_type => @commentable.class, :commentable_id => @commentable.id)
  end
end
