class CommentsController < ApplicationController
  before_filter :find_commentable

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = @commentable.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      # redirect_to journey_diary_entries_path, notice: "Comments successfully created!"
      respond_to do |format|
        format.html
        format.json
      end
    end

  end

  def destroy
    @comment = Comment.find(params[:id])
    @Comment.destroy
  end


  private

  def find_commentable
    @klass = eval(comment_params[:commentable_type])
    @commentable = @klass.find(comment_params[:commentable_id])
  end

  def comment_params
    params.require(:comment).permit(:user_id, :body, :commentable_type, :commentable_id)
  end
end
