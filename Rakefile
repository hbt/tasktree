require "bundler/setup"
require 'json'

desc "Format javascript files\n format one file `rake format_js [filename]` \n format all files in git status `rake format_js`\n format all files `rake format_js all`"
task :format_js do
    extensions = ['.js', '.json']

    if ARGV[1] == 'all'
        # all files
        javascript_files = Dir["**/*{#{extensions.join(',')}}"]
    elsif ARGV.length > 1
        # specific files
        javascript_files = ARGV[1..-1]
    else
        # only scan for modified/added files
        javascript_files = `git status --porcelain`.split("\n")
        javascript_files.map! {|jsf| (jsf.strip || jsf).split(" ")[1] }
        javascript_files.select! do |jsf|
            extensions.index {|ext| jsf.end_with? ext } != nil
        end
    end

    javascript_files.map do |file|
        p "formatting #{file}"
        #        formated_content = `js-beautify --brace-style=expand -s 4 #{file}`
        formated_content = `js-beautify -s 4 #{file}`
        # // TODO(hbt): add sha1 check and only write when content is different
        File.open(file, 'w') {|f| f.write(formated_content) }
    end
    abort
end

desc "Format javascript files\n format one file `rake format_js [filename]` \n format all files in git status `rake format_js`\n format all files `rake format_js all`"
task :hint_js do
    extensions = ['.js', '.json']

    if ARGV[1] == 'all'
        # all files
        javascript_files = Dir["**/*{#{extensions.join(',')}}"]
    elsif ARGV.length > 1
        # specific files
        javascript_files = ARGV[1..-1]
    else
        # only scan for modified/added files
        javascript_files = `git status --porcelain`.split("\n")
        javascript_files.map! {|jsf| (jsf.strip || jsf).split(" ")[1] }
        javascript_files.select! do |jsf|
            extensions.index {|ext| jsf.end_with? ext } != nil
        end
    end

    javascript_files.map do |file|
        p "analyzing #{file}"
        #        formated_content = `js-beautify --brace-style=expand -s 4 #{file}`
        results = `jshint --config=config/hintrc.json #{file}`
        # // TODO(hbt): add sha1 check and only write when content is different
        puts results if results != ""
    end
    abort
end



task :pre_commit do
     puts %x[rake format_js]
     puts %x[rake hint_js]
end