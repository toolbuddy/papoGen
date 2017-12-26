// for reusable functions
const fh = require("filehound");
const fsx = require("fs-extra");
const mkdirp = require("mkdirp");
const jsfs = require("jsonfile");
const jsyaml = require("js-yaml");
const path = require("path");
const os = require("os");
const fs = require("fs");

const utils = {};

// fetch the source files, and construct the data structure to generate document
utils.fetch = function(raw_filelist,s_type){
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
        let obj;
        switch(s_type){
            case "json": 
                obj = jsfs.readFileSync(raw_filelist[index],'utf-8');
            break;
            case "yaml":
                obj = jsyaml.safeLoad(fs.readFileSync(raw_filelist[index],'utf-8'));
            break;
        }

        // Safe
        file_element.article = obj.article;
        file_element.loc = raw_filelist[index];
        file_element.article_content = obj.article_content;

        namelist = namelist.concat(file_element);
    }

    return namelist;
}


// resolving files/images usage (to solve data dependencies)
utils.resolve = function(packed_filelist,dest){
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
                                if(url != ""){
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

module.exports = utils;