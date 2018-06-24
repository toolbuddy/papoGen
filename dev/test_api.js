#! /usr/bin/env node
const papogen = require('../main');

// use papogen api 
papogen.gen_api("md_doc","../test/md","papoGen","./out","md","paper");