// Separate from JSON/YAML format
// be the indie style
const fh = require("filehound");
const fsx = require("fs-extra");
const jsyaml = require("js-yaml");
const path = require("path");
const mkdirp = require("mkdirp");
const moment = require("moment");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const pug = require("pug");
const os = require("os");
const fs = require("fs");

const template_api = require('./template');
const utils = require('./utils');
const compile_engine_md = {};

// Generating TOC table for own use
compile_engine_md.gen_toc = function(dom){
    // Parsing dom tree, and pack all available dom tree
    let contents = dom.window.document.getElementsByClassName("content");
    // Build Table of content , per content.
    for(var c=0;c<contents.length;c++){
        // Step 1: Get h1 tag , pack into js object, and modify it
        let toc="<p class=\"modal-text\"> Tab:"+c+"</p><hr><ol>";
        // let h1_tags=dom.window.document.getElementsByTagName("H1");
        let h1_tags=contents[c].getElementsByTagName("H1");
        //console.log(h1_tags);
        for(var i=0;i<h1_tags.length;i++){
            // create toc 
            console.log(h1_tags[i].innerHTML);
            toc+="<li><a href=#"+h1_tags[i].innerHTML.replace(" ","%20")+">"+h1_tags[i].innerHTML+"</li>";
        }
        toc+="</ol>"
        // Step 2: construct toc table
        let toc_dom = JSDOM.fragment(toc);
        dom.window.document.getElementById("toc").appendChild(toc_dom);
    }
    
    // Replace all tags (Global)
    let h1_tags = dom.window.document.getElementsByTagName("H1");
    for(let i=0;i<h1_tags.length;i++){
        dom.window.document.getElementsByTagName("H1")[i].setAttribute("id",dom.window.document.getElementsByTagName("H1")[i].innerHTML.replace(" ","%20"));
    }

    // return dom tree 
    return dom;
}

compile_engine_md.gen_doc_md = function(src_path,title,out_path){
    // fetch and generate
    const files = fh.create().paths(src_path).ext('md').find((err,files) => {
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
            console.log("After exclude useless md:")
            console.dir(files);
            let fnamelist = utils.fetch(files,"md");
            // copy the buffer to dest
            utils.write_buffer(out_path);
            // read file content and pack together
            let result = template_api.md_doc()({ title: title, namelist: fnamelist});
            // Add on feature
            let dom = new JSDOM(result);
            // TOC 
            dom = this.gen_toc(dom);
            result = dom.serialize();
            // console.log(dom.window.document.getElementsByTagName("H1")[0].innerHTML);
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

module.exports = compile_engine_md;