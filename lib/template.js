// pug gen API: provide pug content from input
const fs = require('fs');
const path = require('path');
const pug = require("pug");
const template_api = {};

template_api.main = function(){
    // return entire html content
    return fs.readFileSync(path.join(__dirname,"template","paper.pug"),'utf-8');
}


module.exports = template_api;