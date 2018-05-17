#!/usr/bin/ruby
# Modify Platform.js as per https://github.com/utkarshkukreti/elm-remotedev
file_name = "elm-stuff/packages/elm-lang/core/5.1.1/src/Native/Platform.js";
str = File.read(file_name);
re = /(model = results\._0;\n\t\t\t)(updateView\(model\);)/
subst = "\\1typeof ElmRemoteDev !== \'undefined\' && ElmRemoteDev.send(msg, model);\n\t\t\t\\2"
result = str.gsub(re, subst)
File.open(file_name, "w") {|file| file.puts result };
