class TagsController < ApplicationController


  def index
    if params[:search]
      @tags = Tag.where("body LIKE ?", params[:search].downcase)
      @search_results = []
      @tags.each { |t| @search_results << t.taggable }

    respond_to do |format|
      format.html
      format.js
    end
  end

  end

  def show
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      if @tag.body != "recommended"
        respond_to do |format|
        format.html
        format.js
      end
      else
        render nothing: true
      end
    else
      flash[:error] = "Body Can't be Blank!"
    end

  end

  def destroy
  end

  private
  def tag_params
    params.require(:tag).permit(:body, :taggable_id, :taggable_type, :user_id)
    #code
  end


end
