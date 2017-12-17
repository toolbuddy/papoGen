# paperGen
Using paper.css and pug.js to generate.

# workflow

![](./design/workflow.png)

# usage

## json
* Using `json` as configuration.
* After specify the `src` directory, paperUI will fetch all .json under `src`, and using each *filename* to be as "tag" in output.
* And then will base on specified format to generate content (see more detail below)

* Example command:
```
» node main.js -s test/ -o dest/ -t KevinBird   
```