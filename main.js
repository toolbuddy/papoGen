#! /usr/bin/env node

var program = require('commander');
var pug = require('pug');
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');

// module
const compile_engine = require('./lib/compile_engine');
const template_api = require('./lib/template');

// For API usage
const papogen_api = {};

// If process.argv elements are more than 2, use CLI mode
if (process.argv.length > 2) {
    // Commander
    program
        .option('-h, --help', 'Helper manual')
        .option('-s, --src [dir]', 'Input Directory [dir]', __dirname)
        .option('-o, --out [dir]', 'Output Directory [dir]', __dirname)
        .option('-t, --title [name]', 'Specify the title name [name]', 'Power by papoGen')
        .option('-g, --gen [type]', 'Specify the generating mechanism [type]', 'json')
        .option('-m, --model [name]', 'Specify the model/template of result [name] (Default will be `doc`)', 'doc')
        .option('--theme [theme]', 'Specify which CSS theme you want to use for template of website. (Default: `paper`)', 'paper')
        .option('-c, --create [script/format]', 'Specify the script template to generate [script/format]', undefined)
        .parse(process.argv);

    let dep = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');
    let depobj = JSON.parse(dep);

    console.log('\nWelcome using toolbuddy@papoGen!');
    console.log('Current version: ' + chalk.green(depobj.version) + '\n');
    if (!program.help) {
        console.log(
            chalk.red('USAGE:\n      > papogen -s[--src] <src_path> -o[--out] <out_path> -t[--title] <title> -g[--gen] <type> -m[--model] <name> --theme <theme> -h[--help]\n'),
            chalk.red('\t\t-s[--src]: Specify the source files directory(using multiple configure files)\n'),
            chalk.red('\t\t-o[--out]: Specify the output destination directory(will generate website for u!)\n'),
            chalk.red('\t\t-t[--title]: Specify the title name of your website\n'),
            chalk.red('\t\t-g[--gen]: Specify the generating mechanism of result, user can pick from several types. default value is "json"\n'),
            chalk.red('\t\t-m[--model]: Specify the model/template of result\n'),
            chalk.red('\t\t--theme: Specify which CSS theme you want to use for template of website. (Default: `paper`)\n'),
            chalk.red('\t\t-h[--help]: List out usage of papoGen\n\n')
        );

        console.log(
            chalk.yellow('DRTAIL OF USAGE:\n'),
            chalk.white('     * Default value of each parameter:\n'),
            chalk.yellow('\tsrc: current working directory\n'),
            chalk.yellow('\tout: current working directory\n'),
            chalk.yellow('\ttitle: "Powered by papoGen"\n'),
            chalk.yellow('\tgen: "json"\n'),
            chalk.yellow('\tmodel: "doc"\n'),
            chalk.yellow('\ttheme: "paper"\n'),
            chalk.white('     * If specified "-h" in command, then program will only list out usage, without any generation.\n')
        );

        console.log(
            chalk.green('OPTIONAL USAGE:\n      > papogen -c[--create] <script/format> -o[--out] <out_path>\n'),
            chalk.green('\t\t-c[--create]: Generate template by command, with -o to specify output directory\n'),
            chalk.green('\t\t              (Generation will terminate the program after it finished)\n')
        );

        template_api.list();
        return;
    } else {
        console.log(chalk.blue('   - src is', program.src));
        console.log(chalk.blue('   - out is', program.out));
        console.log(chalk.green('   - title is', program.title));
        console.log(chalk.green('   - gen is', program.gen));
        console.log(chalk.green('   - model is', program.model));
        console.log(chalk.green('   - theme is', program.theme));
        console.log('\n');

        if (program.create) {
            // user want to generate template
            console.log(`Generating ... `);
            console.log(`Specified: ${program.create}`);
            console.log(`Output dir (for script template): ${program.out}`);

            let script = program.create.split('/')[0];
            let list_raw = program.create.split('/');
            // change to format list, so it can be like: xxxx/xxxx/xxxx ... specify several templates
            if (list_raw.length > 2) {
                // format -> format list
                for (var i = 1; i < list_raw.length; i++) {
                    // copy template to target
                    copy_template(program.out, script, list_raw[i]);
                }
            } else if (list_raw.length == 2) {
                // only 2, means only need to consider [1] element 
                if (list_raw[1] == "all") {
                    // copy all 
                    let all_template = template_api.format_list(script);
                    // console.log(all_template);
                    for (var index in all_template) {
                        copy_template(program.out, script, all_template[index]);
                    }
                } else {
                    copy_template(program.out, script, list_raw[1]);
                }
            }
            return;
        }

        // Get all the .json with specify src
        switch (program.model) {
            case 'doc':
                console.log(`Source directory: ${program.src}, Output directory: ${program.out}`)
                compile_engine.gen_doc(
                    program.src,
                    program.title,
                    program.out,
                    program.gen,
                    program.theme
                );
                break;
            case 'resume':
                compile_engine.gen_resume(
                    program.src,
                    program.title,
                    program.out,
                    program.gen,
                    program.theme
                );
                break;
            case 'md_doc':
                compile_engine.gen_doc(
                    program.src,
                    program.title,
                    program.out,
                    program.gen,
                    program.theme
                );
                break;
            case 'test':
                compile_engine.gen_test(
                    program.src,
                    program.title,
                    program.out,
                    program.gen,
                    program.theme
                );
                break;
            default:
                console.log(chalk.red(`[Error] Model specification "${program.model}" not found`));
        }
    }
}

function copy_template(out, script, format) {
    fs.readFile(
        path.join(__dirname, 'lib', 'script', script, format + '.' + script), 'utf-8',
        function(err, data) {
            if (err) {
                console.log('[Error] Read script template error!');
                return;
            }
            // and then write it into output
            fs.writeFile(path.join(out, format + '.' + script), data, 'utf-8', function(err) {
                if (err)
                    console.log('[Error] Write script template error!');
                else
                    console.log(chalk.green(`[Success] Write script template file - ${script}/${format}`));
            });
        })
}

// For API export 
papogen_api.gen_api = function(model, src, title, out, gen, theme) {
    console.log('\nWelcome using toolbuddy@papoGen API version!');

    console.log(chalk.blue('   - src is', src));
    console.log(chalk.blue('   - out is', out));
    console.log(chalk.green('   - title is', title));
    console.log(chalk.green('   - gen is', gen));
    console.log(chalk.green('   - model is', model));
    console.log(chalk.green('   - theme is', theme));
    console.log('\n');

    switch (model) {
        case 'doc':
            console.log(`Source directory: ${src}, Output directory: ${out}`)
            compile_engine.gen_doc(
                src,
                title,
                out,
                gen,
                theme
            );
            break;
        case 'resume':
            compile_engine.gen_resume(
                src,
                title,
                out,
                gen,
                theme
            );
            break;
        case 'md_doc':
            compile_engine.gen_doc(
                src,
                title,
                out,
                gen,
                theme
            );
            break;
        case 'papogen-resume':
            compile_engine.gen_resume(
                src,
                title,
                out,
                gen,
                theme
            );
            break;
        default:
            console.log(chalk.red(`[Error] Model specification "${model}" not found`));
    }
}

module.exports = papogen_api;