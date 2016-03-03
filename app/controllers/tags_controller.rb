class TagsController < ApplicationController


  def index
    if params[:search]
      @tags = Tag.where(body: params[:search])
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
      # @tag_name = @tag.name
      respond_to do |format|
        format.html
        format.js

      end
    end

  end

  def destroy
  end

  private
  def tag_params
    params.require(:tag).permit(:body, :taggable_id, :taggable_type)
    #code
  end


end
