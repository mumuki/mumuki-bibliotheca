import "ace-builds/src-noconflict/mode-assembly_x86"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-elixir"
import "ace-builds/src-noconflict/mode-gobstones"
import "ace-builds/src-noconflict/mode-haskell"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-markdown"
import "ace-builds/src-noconflict/mode-php"
import "ace-builds/src-noconflict/mode-plain_text"
import "ace-builds/src-noconflict/mode-prolog"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-ruby"
import "ace-builds/src-noconflict/mode-sh"
import "ace-builds/src-noconflict/mode-sql"
import "ace-builds/src-noconflict/mode-wollok"
import "ace-builds/src-noconflict/mode-xml"

ace.config.setModuleUrl('ace/mode/html_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-html.js'));
ace.config.setModuleUrl('ace/mode/javascript_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-javascript.js'));
ace.config.setModuleUrl('ace/mode/json_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-json.js'));
ace.config.setModuleUrl('ace/mode/lua_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-lua.js'));
ace.config.setModuleUrl('ace/mode/php_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-php.js'));
ace.config.setModuleUrl('ace/mode/xml_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-xml.js'));
ace.config.setModuleUrl('ace/mode/xquery_worker', "scripts/" + require('file-loader?name=scripts/ace/[name].[ext]!ace-builds/src-noconflict/worker-xquery.js'));
