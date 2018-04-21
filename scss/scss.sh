#!/bin/bash
# Program: Compile papogen.scss and generate papogen.css file in /lib/asset/ 

sass papogen.scss ../lib/asset/papogen.css
echo SCSS compiled successful. 