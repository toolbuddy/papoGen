// pug gen API: provide pug content from input
const fs = require('fs');
const fh = require("filehound");
const path = require('path');
const pug = require("pug");
const chalk = require('chalk');
const os = require('os');
const template_api = {};

// all in one - template api for generator
template_api.template = function(template_name){
    // return entire html content
    return pug.compileFile(path.join(__dirname, "template", template_name+".pug"));
}

// help manual entries
template_api.list = function() {
    // fetch the current support template
    console.log(
        chalk.magenta('SUPPORT:\n'),
        chalk.white('     * All supporting templates:')
    );
    const files = fh.create().paths(path.join(__dirname, 'template')).ext('pug').depth(0).find((err, files) => {
        for (var i in files) {
            if (os.type() == "Windows_NT") {
                console.log(chalk.magenta('\t' + files[i].substring(files[i].lastIndexOf('\\') + 1, files[i].length).split('.')[0]));
            } else {
                console.log(chalk.magenta('\t' + files[i].substring(files[i].lastIndexOf('/') + 1, files[i].length).split('.')[0]));
            }
        }

        // And then print script support
        console.log(
            chalk.white('      * All supporting scripts:'),
            chalk.magenta(' Use command "papogen -c <script>/<format> -o <output>" to generate script template files')
        );
        this.script_list();
    });
}

// list out supporting scripts format
template_api.script_list = function() {
    let src = path.join(__dirname, 'script');
    let slist = fs
        .readdirSync(src)
        .map(file => path.join(src, file))
        .filter(paths => fs.statSync(paths).isDirectory());
    for (var index in slist) {
        if (os.type() == "Windows_NT") {
            let arr = slist[index].split('\\');
            console.log(chalk.magenta('\t' + arr[arr.length - 1].toUpperCase()));
            // And then print out under this script, which format support
            this.format_list(arr[arr.length - 1]);
        } else {
            let arr = slist[index].split('/');
            console.log(chalk.magenta('\t' + arr[arr.length - 1].toUpperCase()));
            // And then print out under this script, which format support
            this.format_list(arr[arr.length - 1]);
        }
    }
}

template_api.format_list = function(s_type) {
    let src = path.join(__dirname, 'script', s_type);
    let flist = fs
        .readdirSync(src)
        .map(file => path.join(src, file))
        .filter(function(element) {
            var extName = path.extname(element);
            return extName === '.' + s_type;
        });
    let result=[];
    for (var index in flist) {
        if (os.type() == "Windows_NT") {
            let arr = flist[index].substring(0, flist[index].lastIndexOf('.')).split('\\');
            console.log(chalk.grey('\t - ' + arr[arr.length - 1]));
            result.push(arr[arr.length - 1]);
        } else {
            let arr = flist[index].substring(0, flist[index].lastIndexOf('.')).split('/');
            console.log(chalk.grey('\t - ' + arr[arr.length - 1]));
            result.push(arr[arr.length - 1]);
        }
    }
    return result;
}

module.exports = template_api;
