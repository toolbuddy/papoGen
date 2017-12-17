// pug gen API: provide pug content from input
const fs = require('fs');
const path = require('path');
const pug = require("pug");
const template_api = {};

template_api.main = function(){
    // return entire html content
    return fs.readFileSync(path.join(__dirname,"template","main.pug"),'utf-8');
}

template_api.tabs = function(name_list,src_list){
}

module.exports = template_api;