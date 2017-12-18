// compile the configuration to result -> generate html
const fh = require("filehound");
const fsx = require("fs-extra");
const jsfs = require("jsonfile");
const path = require("path");
const mkdirp = require("mkdirp");
const moment = require("moment");
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
            let fnamelist = fetch(files);
            fnamelist = resolve(fnamelist,out_path);
            // console.log(JSON.stringify(fnamelist))
            // read file content and pack together
            let result = (pug.render(template_api.main(),{ title: title, namelist:fnamelist , moment: moment }));

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

function resolve(packed_filelist,dest){
    // find if there are any image/code/files usage
    // if existed, then copy to dest/res/, using mkdirp to create folder
    
    // checking each element's article_content -> content
    for(var f in packed_filelist){
        // multiple files layer
        for(var a in packed_filelist[f].article_content){
            // article (article_content) layer
            for(var c in packed_filelist[f].article_content[a].content){
                // here we are, start to scan
                switch(packed_filelist[f].article_content[a].content[c].type){
                    case "code":
                        // copy code file to dest/res/
                        // after copy, then we can resolve to path!
                    break;
                    case "image":
                        // copy image file to dest/res/
                        // after copy, then we can resolve to path!
                    break;
                    default:
                        // do nothing
                }
            }
        }
    }

    return packed_filelist;
}

function fetch(raw_filelist){
    let namelist = [];

    for(var index in raw_filelist){
        // console.log(raw_filelist[index].substring(raw_filelist[index].lastIndexOf('/'),raw_filelist[index].length));
        let file_element = {
            filename: "",
            article: "",
            article_content: []
        };
        // Fetch filename, treat as tag name
        let fname;
        if(os.type()=="Window_NT")
            fname = raw_filelist[index].substring(raw_filelist[index].lastIndexOf('\\')+1,raw_filelist[index].length);
        else
            fname = raw_filelist[index].substring(raw_filelist[index].lastIndexOf('/')+1,raw_filelist[index].length);
        file_element.filename = fname;

        // Read File, attach to element
        let obj = jsfs.readFileSync(raw_filelist[index],'utf-8');

        file_element.article = obj.article;
        file_element.article_content = obj.article_content;

        namelist = namelist.concat(file_element);
    }

    return namelist;
}

module.exports = compile_engine;