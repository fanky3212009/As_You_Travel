class CreateStructure < ActiveRecord::Migration
  def change
    create_table "comments", force: :cascade do |t|
      t.text     "body"
      t.integer  "user_id"
      t.integer  "commentable_id"
      t.string   "commentable_type"
      t.datetime "created_at",       null: false
      t.datetime "updated_at",       null: false
    end

    add_index "comments", ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    add_index "comments", ["user_id"], name: "index_comments_on_user_id"

    create_table "diary_entries", force: :cascade do |t|
      t.string   "title"
      t.string   "location"
      t.datetime "date"
      t.text     "content"
      t.text     "recommendation"
      t.integer  "journey_id"
      t.datetime "created_at",     null: false
      t.datetime "updated_at",     null: false
      t.float    "latitude"
      t.float    "longitude"
    end

    add_index "diary_entries", ["journey_id"], name: "index_diary_entries_on_journey_id"

    create_table "journeys", force: :cascade do |t|
      t.string   "title"
      t.datetime "start_date"
      t.datetime "end_date"
      t.text     "description"
      t.string   "feat_img"
      t.string   "location"
      t.datetime "created_at",  null: false
      t.datetime "updated_at",  null: false
      t.integer  "owner_id"
      t.float    "latitude"
      t.float    "longitude"
    end

    create_table "photos", force: :cascade do |t|
      t.string   "name"
      t.integer  "imageable_id"
      t.string   "imageable_type"
      t.datetime "created_at",     null: false
      t.datetime "updated_at",     null: false
      t.string   "picture"
    end

    add_index "photos", ["imageable_type", "imageable_id"], name: "index_photos_on_imageable_type_and_imageable_id"

    create_table "relationships", force: :cascade do |t|
      t.integer  "follower_id"
      t.integer  "followed_id"
      t.datetime "created_at",  null: false
      t.datetime "updated_at",  null: false
    end

    add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id"
    add_index "relationships", ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id"

    create_table "tags", force: :cascade do |t|
      t.string   "body"
      t.integer  "taggable_id"
      t.string   "taggable_type"
      t.datetime "created_at",    null: false
      t.datetime "updated_at",    null: false
    end

    add_index "tags", ["taggable_type", "taggable_id"], name: "index_tags_on_taggable_type_and_taggable_id"

    create_table "users", force: :cascade do |t|
      t.string   "email",                           null: false
      t.string   "crypted_password"
      t.string   "salt"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "remember_me_token"
      t.datetime "remember_me_token_expires_at"
      t.string   "reset_password_token"
      t.datetime "reset_password_token_expires_at"
      t.datetime "reset_password_email_sent_at"
      t.string   "name"
    end

    add_index "users", ["email"], name: "index_users_on_email", unique: true
    add_index "users", ["remember_me_token"], name: "index_users_on_remember_me_token"
    add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token"

    
  end
end
