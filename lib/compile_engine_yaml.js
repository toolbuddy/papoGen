const fh = require("filehound");
const fsx = require("fs-extra");
const jsyaml = require("js-yaml");
const path = require("path");
const mkdirp = require("mkdirp");
const moment = require("moment");
const pug = require("pug");
const os = require("os");
const fs = require("fs");

const template_api = require('./template');
const compile_engine_yaml = {}; 


// Generate "doc" template by json format
compile_engine_yaml.gen_doc_yaml = function(src_path,title,out_path){
    // fetch and generate
    const files = fh.create().paths(src_path).ext('yaml').find((err,files) => {
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
            console.log("After exclude useless yaml:")
            console.dir(files);
            let fnamelist = fetch(files);
            fnamelist = resolve(fnamelist,out_path);
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
compile_engine_yaml.gen_resume_yaml = function(src_path,title,out_path){
    // fetch and generate
    const files = fh.create().paths(src_path).ext('yaml').find((err,files) => {
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
            let fnamelist = fetch(files);
            fnamelist = resolve(fnamelist,out_path);
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

function fetch(raw_filelist){
    let namelist = [];

    for(var index in raw_filelist){
        // console.log(raw_filelist[index].substring(raw_filelist[index].lastIndexOf('/'),raw_filelist[index].length));
        let file_element = {
            filename: "",
            loc: "",
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
        let obj = jsyaml.safeLoad(fs.readFileSync(raw_filelist[index],'utf-8'));
        
        // Safe
        file_element.article = obj.article;
        file_element.loc = raw_filelist[index];
        file_element.article_content = obj.article_content;

        namelist = namelist.concat(file_element);
    }

    return namelist;
}

// resolving files/images usage (to solve data dependencies)
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
                        for(var d in packed_filelist[f].article_content[a].content[c].data){
                            // 2 type support 
                            if(packed_filelist[f].article_content[a].content[c].data[d].url != undefined){
                                // read all the content and push into it
                                let url=packed_filelist[f].article_content[a].content[c].data[d].url;
                                let urlpath="";
                                if(os.type() == "Window_NT"){
                                    urlpath = path.resolve(packed_filelist[f].loc.substring(0,packed_filelist[f].loc.lastIndexOf('\\')),url);
                                }
                                else{
                                    urlpath = path.resolve(packed_filelist[f].loc.substring(0,packed_filelist[f].loc.lastIndexOf('/')),url);
                                }
                                console.log("Resolving path to code: "+urlpath);
                                // without check 
                                packed_filelist[f].article_content[a].content[c].data[d].raw = fs.readFileSync(urlpath,'utf-8');
                            }
                            else{
                                // use directly, do nothing

                            }
                        }
                    break;
                    case "image":
                        // copy image file to dest/res/
                        for(var d in packed_filelist[f].article_content[a].content[c].data){
                            let url=packed_filelist[f].article_content[a].content[c].data[d].url;
                            if(url == undefined){
                                console.log("[Error] Your image url hasn't defined yet!");
                                break;
                            }
                            // assume newpath assign -> find filename (from url), assign it first
                            let filename;
                            if(os.type() == "Window_NT"){
                                let f_arr = url.split('\\');
                                filename = f_arr[f_arr.length-1];
                            }
                            else{
                                let f_arr = url.split('/');
                                filename = f_arr[f_arr.length-1];
                            }
                            let newpath = "./res/" + filename;
                            
                            // check the url
                            if(url.split(':')[0] == "https" || url.split(':')[0] == "http"){
                                // resource in internet, do nothing
                            }
                            else{
                                // assign new path back to url
                                packed_filelist[f].article_content[a].content[c].data[d].url = newpath;
                                console.log("Resolving new path: " + packed_filelist[f].article_content[a].content[c].data[d].url)

                                // copy that image and create folder dest/res/
                                mkdirp(path.join(dest,'res'),function(err){
                                    if(err){
                                        console.error("[Error] mkdirp error in 'resolve' function (compile_engine.js)");
                                        return;
                                    }
                                    else{
                                        // resolve and find the image 
                                        let urlpath="";
                                        if(os.type() == "Window_NT"){
                                            urlpath = path.resolve(packed_filelist[f].loc.substring(0,packed_filelist[f].loc.lastIndexOf('\\')),url);
                                        }
                                        else{
                                            urlpath = path.resolve(packed_filelist[f].loc.substring(0,packed_filelist[f].loc.lastIndexOf('/')),url);
                                        }
                                        // check state
                                        fsx.pathExists(urlpath,function(err,exists){
                                            if(err){
                                                console.error("[Error] fs-extra.pathExists error in 'resolve' function (compile_engine.js)")
                                                return;
                                            }
                                            else{
                                                if(exists){
                                                    // if exist, copy
                                                    // copy to dest
                                                    fsx.copySync(urlpath,path.join(dest,'res',filename));
                                                }
                                                else{
                                                    console.log(`Resolving: ${urlpath} is not existed! Original: ${url}`);
                                                }
                                            }
                                        })
                                        
                                    }
                                });
                            }
                        }
                    break;
                    case "card":
                        // copy image file to dest/res/
                        for(var d in packed_filelist[f].article_content[a].content[c].data){
                            let url=packed_filelist[f].article_content[a].content[c].data[d].url;
                            // legal or not
                            if(url == undefined)
                                url = "";
                            // assume newpath assign -> find filename (from url), assign it first
                            let filename;
                            if(os.type() == "Window_NT"){
                                let f_arr = url.split('\\');
                                filename = f_arr[f_arr.length-1];
                            }
                            else{
                                let f_arr = url.split('/');
                                filename = f_arr[f_arr.length-1];
                            }
                            let newpath = "./res/" + filename;

                            // check the url
                            if(url.split(':')[0] == "https" || url.split(':')[0] == "http"){
                                // resource in internet, do nothing
                            }
                            else{
                                if(url!=""){
                                    // assign new path back to url
                                    packed_filelist[f].article_content[a].content[c].data[d].url = newpath;
                                    console.log("Resolving new path: " + packed_filelist[f].article_content[a].content[c].data[d].url)
                                    // copy that image and create folder dest/res/
                                    mkdirp(path.join(dest,'res'),function(err){
                                        if(err){
                                            console.error("[Error] mkdirp error in 'resolve' function (compile_engine.js)");
                                            return;
                                        }
                                        else{
                                            // resolve and find the image 
                                            let urlpath="";
                                            if(os.type() == "Window_NT"){
                                                urlpath = path.resolve(packed_filelist[f].loc.substring(0,packed_filelist[f].loc.lastIndexOf('\\')),url);
                                            }
                                            else{
                                                urlpath = path.resolve(packed_filelist[f].loc.substring(0,packed_filelist[f].loc.lastIndexOf('/')),url);
                                            }
                                            // check state
                                            fsx.pathExists(urlpath,function(err,exists){
                                                if(err){
                                                    console.error("[Error] fs-extra.pathExists error in 'resolve' function (compile_engine.js)")
                                                    return;
                                                }
                                                else{
                                                    if(exists){
                                                        // if exist, copy
                                                        // copy to dest
                                                        fsx.copySync(urlpath,path.join(dest,'res',filename));
                                                    }
                                                    else{
                                                        console.log(`Resolving: ${urlpath} is not existed! Original: ${url}`);
                                                    }
                                                }
                                            })
                                            
                                        }
                                    });
                                }
                            }
                        }
                    break;
                    default:
                        // do nothing
                }
            }
        }
    }

    return packed_filelist;
}

module.exports = compile_engine_yaml;