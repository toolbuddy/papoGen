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
const utils = require('./utils');
const compile_engine_json = {};

// Generate "doc" template by JSON format
compile_engine_json.gen_doc_json = function(src_path, title, out_path, theme) {
    // Fetch and generate
    const files = fh.create().paths(src_path).ext('json').find((err, files) => {
        if (err)
            return;
        else {
            // Strip out the files under node_modules
            for (var index = 0;; index++) {
                if (files[index] == undefined) break;
                if (files[index].indexOf('node_modules') != -1) {
                    files.splice(index, 1);
                    index--;
                }
            }

            // DEBUG: List out all existed files 
            console.log("After exclude useless JSON:")
            console.dir(files);

            let fnamelist = utils.fetch(files, "json");
            fnamelist = utils.resolve(fnamelist, out_path);
            // Read file content and pack together
            // let result = template_api.doc()({ title: title, namelist:fnamelist , moment: moment, theme: theme});
            let result = template_api.template("doc")({
                title: title,
                namelist: fnamelist,
                moment: moment,
                theme: theme
            });

            // DEBUG: Successful message
            console.log(`Successfully compile/render target pug files. Ready to output.`);

            // Write the file 
            utils.render(out_path, result, theme)
                /*mkdirp(out_path, function(err) {
                    if (err) {
                        console.error("mkdirp error!");
                        return;
                    } else {
                        // Write the file to "dest/"
                        console.log(`Result HTML: ${path.join(out_path,'index.html')}`);
                        fs.writeFileSync(path.join(out_path, 'index.html'), result, { encoding: 'utf-8', flag: 'w' });

                        // Copy all asset to "dest/"
                        console.log(`Source asset path: ${path.join(__dirname,'asset')}`);
                        console.log(`Output asset path: ${path.join(out_path,'asset')}`);
                        fsx.copySync(path.join(__dirname, 'asset'), path.join(out_path, 'asset'));
                    }
                })*/
        }
    });
}

// Generate "resume" template by JSON format
compile_engine_json.gen_resume_json = function(src_path, title, out_path, theme) {
    // Fetch and generate
    const files = fh.create().paths(src_path).ext('json').find((err, files) => {
        if (err)
            return;
        else {
            // Strip out the files under node_modules
            for (var index = 0;; index++) {
                if (files[index] == undefined) break;
                if (files[index].indexOf('node_modules') != -1) {
                    files.splice(index, 1);
                    --index;
                }
            }

            // DEBUG: List out all existed files 
            console.log("After exclude useless JSON:")
            console.dir(files);

            let fnamelist = utils.fetch(files, "json");
            fnamelist = utils.resolve(fnamelist, out_path);
            // let result = template_api.resume()({ title: title, namelist:fnamelist , moment: moment, theme: theme});
            let result = template_api.template("resume")({
                title: title,
                namelist: fnamelist,
                moment: moment,
                theme: theme
            });

            // DEBUG: Successful message
            console.log(`Successfully compile/render target pug files. Ready to output.`);

            // Write the file 
            utils.render(out_path, result, theme)
                /*mkdirp(out_path, function(err) {
                    if (err) {
                        console.error("mkdirp error!");
                        return;
                    } else {
                        // Write the file to "dest/"
                        console.log(`Result HTML: ${path.join(out_path,'index.html')}`);
                        fs.writeFileSync(path.join(out_path, 'index.html'), result, { encoding: 'utf-8', flag: 'w' });

                        // Copy all asset to "dest/"
                        console.log(`Source asset path: ${path.join(__dirname,'asset')}`);
                        console.log(`Output asset path: ${path.join(out_path,'asset')}`);
                        fsx.copySync(path.join(__dirname, 'asset'), path.join(out_path, 'asset'));
                    }
                })*/
        }
    });
}

// Generate "papogen-resume" template by JSON format
compile_engine_json.gen_papogen_resume = function(src_path, title, out_path, theme) {
    // Fetch and generate
    const files = fh.create().paths(src_path).ext('json').find((err, files) => {
        if (err)
            return;
        else {
            // Strip out the files under node_modules
            for (var index = 0;; ++index) {
                if (files[index] == undefined) break;
                if (files[index].indexOf('node_modules') != -1) {
                    files.splice(index, 1);
                    --index;
                }
            }

            // DEBUG: List out all existed files 
            console.log("After exclude useless JSON:")
            console.dir(files);

            let fnamelist = utils.fetch(files, "json");
            // Sort the column into "profile -> resume" order
            if (fnamelist[0].article !== 'Profile' && fnamelist[0].article !== 'profile') {
                var tmp = fnamelist[0];
                fnamelist[0] = fnamelist[1];
                fnamelist[1] = tmp;
            }

            fnamelist = utils.resolve(fnamelist, out_path);

            // Let result = template_api.resume()({ title: title, namelist:fnamelist , moment: moment, theme: theme});
            let result = template_api.template("papogen-resume")({
                title: title,
                namelist: fnamelist,
                moment: moment,
                theme: theme
            });

            // DEBUG: Successful message
            console.log(`Successfully compile/render target pug files. Ready to output.`);

            // Write the file 
            utils.render(out_path, result, theme);
        }
    });
}

module.exports = compile_engine_json;