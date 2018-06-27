/**
 * compiler_engine.js
 * 
 * - Controll the entries of papoGen
 * 
 * gen_doc()
 * gen_resume()
 */

// compile the configuration to result -> generate html
const compile_engine_json = require('./compile_engine_json');
const compile_engine_yaml = require('./compile_engine_yaml');
const compile_engine_md = require('./compile_engine_md');
const compile_engine = {};

// Generate "doc" template
compile_engine.gen_doc = function(src_path, title, out_path, gen_base, theme) {
    // base on different generating mechanism to have different function
    switch (gen_base) {
        case 'json':
            compile_engine_json.gen_doc_json(src_path, title, out_path, theme);
            break;
        case 'yaml':
            compile_engine_yaml.gen_doc_yaml(src_path, title, out_path, theme);
            break;
        case 'md':
            compile_engine_md.gen_doc_md(src_path, title, out_path, theme);
            break;
        default:
            console.log(`[Error] Generating mechanism "${gen_base}" not support yet!`);
            break;
    }

}

// Generate "resume" template
compile_engine.gen_resume = function(src_path, title, out_path, gen_base, theme) {
    // base on different generating mechanism to have different function
    switch (gen_base) {
        case 'json':
            compile_engine_json.gen_resume_json(src_path, title, out_path, theme);
            break;
        case 'yaml':
            compile_engine_yaml.gen_resume_yaml(src_path, title, out_path, theme);
            break;
        case 'md':

            break;
        default:
            console.log(`[Error] Generating mechanism "${gen_base}" not support yet!`);
            break;
    }

}

module.exports = compile_engine;