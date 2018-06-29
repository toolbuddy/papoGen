#!/usr/bin/node
// under testing feature
var phantom = require('phantom')

phantom.create().then(function(ph){
    ph.createPage().then(function(page){
        page.open("../docs/out/resume/index.html").then(function(status){
            page.setting('javascriptEnabled').then(function(value){
                page.property('viewportSize', {width: 1920, height: 1080}).then(function() {
                    page.render('test.pdf').then(function(){
                        console.log('Page rendered');
                        ph.exit();
                    })
                });
            });
            
        })
    })
})