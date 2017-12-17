var program = require('commander');
var pug = require('pug');
var path = require('path');
var chalk = require('chalk');

// module
const compile_engine = require('./lib/compile_engine');

program
.version('0.0.1')
.option('-h, --help', 'Helper manual')
.option('-s, --src [dir]', 'Input Directory [dir]', __dirname)
.option('-o, --out [dir]', 'Output Directory [dir]', __dirname)
.option('-t, --title [name]', 'Specify the title name [name]', 'Power by paperGen')
.parse(process.argv);

console.log('Welcome using toolbuddy@paperGen!');
if(!program.help){
    console.log(
        chalk.red('Usage: paperui -s[--src] <src_path> -o[--out] <out_path> -h[--help]\n'),
        chalk.red('    -s[--src] : specify the source files directory(using multiple configure files)\n'),
        chalk.red('    -o[--out] : specify the output destination directory(will generate website for u!)\n'),
        chalk.red('    -h : list out usage of paperUI\n'),
    );
}
console.log(chalk.blue('   - src is %s', program.src));
console.log(chalk.blue('   - out is %s', program.out));
console.log(chalk.green('   - title is %s', program.title));
console.log('\n');
// Get all the .json with specify src
compile_engine.gen_doc(program.src,program.title,path.resolve(__dirname,program.out));