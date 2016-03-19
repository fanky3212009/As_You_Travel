# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets')
Rails.application.config.assets.paths << Rails.root.join("vendor", "assets", "stylesheets")
Rails.application.config.assets.paths << Rails.root.join("vendor", "assets", "stylesheets", "fonts")
Rails.application.config.assets.paths << Rails.root.join("vendor", "assets", "stylesheets", "icons")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( .css .html .svg .eot .woff .ttf .png .jpg .gif)
Rails.application.config.assets.precompile += %w( timeline.css )
Rails.application.config.assets.precompile += %w( timeline.js )
