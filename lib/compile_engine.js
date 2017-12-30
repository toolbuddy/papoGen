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
const utils = require('./utils');
const compile_engine_yaml = require('./compile_engine_yaml');
const compile_engine_md = require('./compile_engine_md');
const compile_engine = {}; 

// Generate "doc" template
compile_engine.gen_doc = function(src_path,title,out_path,gen_base){
    // base on different generating mechanism to have different function
    switch(gen_base){
        case 'json':
            gen_doc_json(src_path,title,out_path);
            break;
        case 'yaml':
            compile_engine_yaml.gen_doc_yaml(src_path,title,out_path);
            break;
        case 'md':
            compile_engine_md.gen_doc_md(src_path,title,out_path);
            break;
        default:
            console.log(`[Error] Generating mechanism "${gen_base}" not support yet!`);
            break;
    }
    
}

// Generate "resume" template
compile_engine.gen_resume = function(src_path,title,out_path,gen_base){
    // base on different generating mechanism to have different function
    switch(gen_base){
        case 'json':
            gen_resume_json(src_path,title,out_path);
            break;
        case 'yaml':
            compile_engine_yaml.gen_resume_yaml(src_path,title,out_path);
            break;
        case 'md':
            
            break;
        default:
            console.log(`[Error] Generating mechanism "${gen_base}" not support yet!`);
            break;
    }
    
}

// Generate "doc" template by json format
function gen_doc_json(src_path,title,out_path){
    // fetch and generate
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
            console.log("After exclude useless json:")
            console.dir(files);
            let fnamelist = utils.fetch(files,"json");
            fnamelist = utils.resolve(fnamelist,out_path);
            // read file content and pack together
            let result = template_api.doc()({ title: title, namelist:fnamelist , moment: moment});
            // success
            console.log(`Successfully compile/render target pug files. Ready to output.`);
            // Write file 
            mkdirp(out_path,function(err){
                if(err){
                    console.error("mkdirp error!");
                    return;
                }
                else{
                    // write file to dest
                    console.log(`Result html: ${path.join(out_path,'index.html')}`);
                    fs.writeFileSync(path.join(out_path,'index.html'),result,{encoding: 'utf-8', flag: 'w'});
                    // copy asset to dest
                    console.log(`Source asset path: ${path.join(__dirname,'asset')}`);
                    console.log(`Output asset path: ${path.join(out_path,'asset')}`);
                    fsx.copySync(path.join(__dirname,'asset'),path.join(out_path,'asset'));
                }
            })
        }
    });
}

// Generate "resume" template by json format
function gen_resume_json(src_path,title,out_path){
    // fetch and generate
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
            console.log("After exclude useless json:")
            console.dir(files);
            let fnamelist = utils.fetch(files,"json");
            fnamelist = utils.resolve(fnamelist,out_path);
            let result = template_api.resume()({ title: title, namelist:fnamelist , moment: moment});
            // success
            console.log(`Successfully compile/render target pug files. Ready to output.`);
            // Write file 
            mkdirp(out_path,function(err){
                if(err){
                    console.error("mkdirp error!");
                    return;
                }
                else{
                    // write file to dest
                    console.log(`Result html: ${path.join(out_path,'index.html')}`);
                    fs.writeFileSync(path.join(out_path,'index.html'),result,{encoding: 'utf-8', flag: 'w'});
                    // copy asset to dest
                    console.log(`Source asset path: ${path.join(__dirname,'asset')}`);
                    console.log(`Output asset path: ${path.join(out_path,'asset')}`);
                    fsx.copySync(path.join(__dirname,'asset'),path.join(out_path,'asset'));
                }
            })
        }
    });
}

module.exports = compile_engine;