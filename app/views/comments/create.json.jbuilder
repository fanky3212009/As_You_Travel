json.comment do
  json.body @comment.body
  json.user_id @comment.user_id
  json.created_at @comment.created_at.strftime('%b %e %Y %H :%M :%S %p')
  json.updated_at @comment.updated_at
  json.commentable_id @comment.commentable_id
  json.commentable_type @comment.commentable_type
  json.user do
    json.name @comment.user.name
    json.profile_img @comment.user.profile_img
  end
end



# json.comment.created_at @comment.created_at.strftime('%e %b %Y %H :%M :%S %p')
# # json.comment.created_at @comment.created_at.strftime('%e %b %Y %H :%M :%S %p')
# json.set! :comment do
#   json.set! :created_at, @comment.created_at.strftime('%e %b %Y %H :%M :%S %p')
# end
