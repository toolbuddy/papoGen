// Transform html to pdf
const fs = require('fs')
const path = require('path')
const phantom = require('phantom')

const pdf = {};

/**
 * @function html2pdf
 * 
 * @param {string} html_path        source path
 * @param {string} pdf_path         pdf (destination path)
 * @param {string} filename         output filename
 * 
 */
pdf_model.html2pdf = function(html_path,pdf_path,filename){
    // transform process
    phantom.create([],{ logLevel: 'info' }).then(function(ph){
        ph.createPage().then(function(page){
            // assign html path to it
            page.open(html_path).then(function(status){
                page.setting('javascriptEnabled').then(function(value){
                    // setting viewport size - set to maximum
                    page.render(path.join(pdf_path,filename)).then(function(){
                        console.log(`Your PDF has been rendered, Please check it out at ${path.join(pdf_path,filename)}`)
                        // exit process
                        ph.exit();
                    })
                })
            })
        })
    })
}

/**
 * @function htmlsrc2pdf (Non-test before)
 * 
 * @param {string} html_path        source path
 * @param {string} pdf_path         pdf (destination path)
 * @param {string} filename         output filename
 * 
 */
pdf_model.htmlsrc2pdf = function(html_src,pdf_path,filename){
    // transform process
    phantom.create([],{ logLevel: 'info' }).then(function(ph){
        ph.createPage().then(function(page){
            // assign html src to it
            page.setContent(html_src);
            page.setting('javascriptEnabled').then(function(value){
                // setting viewport size - set to maximum
                page.render(path.join(pdf_path,filename)).then(function(){
                    console.log(`Your PDF has been rendered, Please check it out at ${path.join(pdf_path,filename)}`)
                    // exit process
                    ph.exit();
                })
            })
        })
    })
}

module.exports = pdf_model