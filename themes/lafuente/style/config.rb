# Require any additional compass plugins here.

require 'scut'
require 'bourbon'
require 'sass-css-importer'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "../_tmp"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"

add_import_path "../bower_components"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
#output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
#line_comments = false

preferred_syntax = :sass



#on_stylesheet_saved do |file|
#  css = File.read(file)
#  File.open(file, 'w') do |io|
#    io << AutoprefixerRails.process(css)
#  end
#end
