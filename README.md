![](./design/badge.png)

# papoGen
[![npm version](https://badge.fury.io/js/papogen.svg)](https://badge.fury.io/js/papogen)
[![npm downloads](https://img.shields.io/npm/dm/papogen.svg)](https://img.shields.io/npm/dm/papogen.svg)

Using paper.css and pug.js to generate.

# workflow

![](./design/workflow.png)

# usage

* Install 
```bash
» [sudo] npm install papogen -g
```

* Help Manual (List out current support)
    * Explain each parameter we support currently!
```bash
~/workspace » papogen -h
```

* Generate
```bash
» papogen -s test/ -o docs/ -t papoGen -m doc
```

* Our document [demo page](https://toolbuddy.github.io/papoGen/), is generate by `papoGen`!
    * Using the json files in test/ 
        * In test/, there are several categories of scripts, each one has a directory
        * And there have a `README.md` inside each directory, explain the format of each type.

## json
* Example command:
```bash
# Use directly (from source code)
» node main.js -s test/ -o docs/ -t papoGen
# By install 
» papogen -s test/ -o docs/ -t papoGen -m doc
```
* Using `json` as configuration.
* After specify the `src` directory, paperUI will fetch all .json under `src`, and using each *filename* to be as "tag" in output.
* And then will base on specified format to generate content (see more detail below)
    * Currently support: `text` (see the source dir: `test/` as input, and destination dir: `docs/` as output)
