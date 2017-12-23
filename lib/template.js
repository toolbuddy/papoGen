// pug gen API: provide pug content from input
const fs = require('fs');
const fh = require("filehound");
const path = require('path');
const pug = require("pug");
const chalk = require('chalk');
const os = require('os');
const template_api = {};

template_api.doc = function(){
    // return entire html content
    // return fs.readFileSync(path.join(__dirname,"template","doc.pug"),'utf-8');
    console.log(path.join(__dirname,"template","doc.pug"));
    return pug.compileFile(path.join(__dirname,"template","doc.pug"));
}

template_api.resume = function(){
    // return entire html content
    return pug.compileFile(path.join(__dirname,"template","resume.pug"));
}

template_api.list = function(){
    // fetch the current support template
    const files = fh.create().paths(path.join(__dirname,'template')).ext('pug').depth(0).find((err,files) => {
        for(var i in files){
            if(os.type() == "Window_NT"){
                console.log(chalk.green('\t'+files[i].substring(files[i].lastIndexOf('\\')+1,files[i].length).split('.')[0]));
            }
            else{
                console.log(chalk.green('\t'+files[i].substring(files[i].lastIndexOf('/')+1,files[i].length).split('.')[0]));
            }
        }
    });
}

module.exports = template_api;