module ApplicationHelper
  def load_commentable
    @klass = eval(controller_name.classify)
    @commentable = @klass.find(params[:id])
  end
end
