require 'sinatra'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/*/' do |path|
  send_file File.join(settings.public_folder, path, 'index.html')
end
