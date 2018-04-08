#! /usr/bin/env node

var program = require('commander');
var pug = require('pug');
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');

// module
const compile_engine = require('./lib/compile_engine');
const template_api = require('./lib/template');

program
.version('0.0.1')
.option('-h, --help', 'Helper manual')
.option('-s, --src [dir]', 'Input Directory [dir]', __dirname)
.option('-o, --out [dir]', 'Output Directory [dir]', __dirname)
.option('-t, --title [name]', 'Specify the title name [name]', 'Power by papoGen')
.option('-g, --gen [type]', 'Specify the generating mechanism [type]', 'json')
.option('-m, --model [name]', 'Specify the model/template of result [name] (Default will be `doc`)', 'doc')
.option('-c, --create [script/format]', 'Specify the script template to generate [script/format]', undefined)
.parse(process.argv);

let dep = fs.readFileSync(path.join(__dirname,'package.json'),'utf-8');
let depobj = JSON.parse(dep);

console.log('\nWelcome using toolbuddy@papoGen!');
console.log('Current version: '+chalk.green(depobj.version)+'\n');
if(!program.help){
    console.log(
        chalk.red('Usage:\npapogen -s[--src] <src_path> -o[--out] <out_path> -t[--title] <title> -g[--gen] <type> -m[--model] <name> -h[--help]\n'),
        chalk.red('    -s[--src] : specify the source files directory(using multiple configure files)\n'),
        chalk.red('    -o[--out] : specify the output destination directory(will generate website for u!)\n'),
        chalk.red('    -t[--title] : specify the title name of your website\n'),
        chalk.red('    -g[--gen] : specify the generating mechanism of result, user can pick from several types. default value is "json"\n'),
        chalk.red('    -m[--model] : specify the model/template of result\n'),
        chalk.red('    -h : list out usage of papoGen\n'),
        chalk.red('=====================================\n')
    );
    console.log(
        chalk.green('Optional usage:\npapogen -c[--create] <script/format> -o[--out] <out_path>\n'),
        chalk.green('   -c[--create] : generate template by command, with -o to specify output directory\n\t(Generation will terminate the program after it finished)\n'),
        chalk.green('=====================================\n')
    );
    console.log(
        chalk.red('Usage/Detail of papoGen:\n'),
        chalk.blue('    default value of each parameter:\n'),
        chalk.red('        src: current working directory\n'),
        chalk.red('        out: current working directory\n'),
        chalk.red('        title: "Powered by papoGen"\n'),
        chalk.red('        gen: "json"\n'),
        chalk.red('        model: "doc"\n'),
        chalk.red('=====================================\n'),
        chalk.red('If specified "-h" in command, then program will only list out usage, without any generation.\n')
    );
    template_api.list();
    return;
}
else{
    console.log(chalk.blue('   - src is', program.src));
    console.log(chalk.blue('   - out is', program.out));
    console.log(chalk.green('   - title is', program.title));
    console.log(chalk.green('   - gen is', program.gen));
    console.log(chalk.green('   - model is', program.model));
    console.log('\n');

    if(program.create){
        // user want to generate template
        console.log(`Generating ... `);
        console.log(`Specified: ${program.create}`);
        console.log(`Output dir(for script template): ${program.out}`);

        let script = program.create.split('/')[0];
        let list_raw = program.create.split('/');
        // change to format list, so it can be like: xxxx/xxxx/xxxx ... specify several templates
        if(list_raw.length > 2){
            // format -> format list
            for(var i=1;i<list_raw.length;i++){
                // copy template to target
                copy_template(program.out,script,list_raw[i]);
            }
        }
        else if(list_raw.length == 2){
            // only 2, means only need to consider [1] element 
            if(list_raw[1] == "all"){
                // copy all 
                let all_template = template_api.format_list(script);
                // console.log(all_template);
                for(var index in all_template){
                    copy_template(program.out,script,all_template[index]);
                }
            }
            else{
                copy_template(program.out,script,list_raw[1]);
            }
        }
        return;
    }

    // Get all the .json with specify src
    switch(program.model){
        case 'doc':
            console.log(`Source directory: ${program.src}, Output directory: ${program.out}`)
            compile_engine.gen_doc(
                program.src,
                program.title,
                program.out,
                program.gen
            );   
        break;
        case 'resume':
            compile_engine.gen_resume(
                program.src,
                program.title,
                program.out,
                program.gen
            );
        break;
        case 'md_doc':
            compile_engine.gen_doc(
                program.src,
                program.title,
                program.out,
                program.gen
            );
        break;
        default:
            console.log(chalk.red(`[Error] Model specification "${program.model}" not found`));
    }
}

function copy_template(out,script,format){
    fs.readFile(
        path.join(__dirname,'lib','script',script,format+'.'+script),'utf-8',
        function(err,data){
            if(err){
                console.log('[Error] Read script template error!');
                return;
            }
            // and then write it into output
            fs.writeFile(path.join(out,format+'.'+script),data,'utf-8',function(err){
                if(err)
                    console.log('[Error] Write script template error!');
                else 
                    console.log(chalk.green(`[Success] Write script template file - ${script}/${format}`));
            });
        })
}