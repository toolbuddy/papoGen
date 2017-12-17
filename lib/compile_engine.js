// compile the configuration to result -> generate html
const fh = require("filehound");
const fsx = require("fs-extra");
const path = require("path");
const mkdirp = require("mkdirp");
const pug = require("pug");
const os = require("os");
const fs = require("fs");

const template_api = require('./template');
const compile_engine = {}; 

compile_engine.gen_doc = function(src_path,title,out_path){
    // Gather all .json under src_path
    const files = fh.create().paths(src_path).ext('json').find((err,files) => {
        if(err)
            return;
        else{
            // strip out the files under node_modules
            for(var index=0;;index++){
                if(files[index] == undefined) break;
                if(files[index].indexOf('node_modules') != -1){
                    files.splice(index,1);
                    index--;
                }
            }
            // list out existed -> files 
            console.dir(files);
            let fnamelist = get_name_list(files);
            let result = (pug.render(template_api.main(),{ title: title, namelist:fnamelist }));

            // Write file 
            mkdirp(out_path,function(err){
                if(err){
                    console.error("mkdirp error!");
                    return;
                }
                else{
                    // write file to dest
                    fs.writeFileSync(path.join(out_path,'index.html'),result,{encoding: 'utf-8', flag: 'w'});
                    // copy asset to dest
                    fsx.copySync(path.join(__dirname,'asset'),path.join(out_path,'asset'));
                }
            })
        }
    });
}

function get_name_list(raw_filelist){
    let namelist = [];

    for(var index in raw_filelist){
        // console.log(raw_filelist[index].substring(raw_filelist[index].lastIndexOf('/'),raw_filelist[index].length));
        if(os.type()=="Window_NT")
            namelist = namelist.concat(raw_filelist[index].substring(raw_filelist[index].lastIndexOf('\\')+1,raw_filelist[index].length));
        else
            namelist = namelist.concat(raw_filelist[index].substring(raw_filelist[index].lastIndexOf('/')+1,raw_filelist[index].length));
    }

    return namelist;
}

module.exports = compile_engine;