'use strict';
const googleapisHelper=require('./googleapisHelper');
const google=require('googleapis');
const driveApi=google.drive('v3');
const fs=require('fs');
const readline = require('readline');
googleapisHelper.auth((auth)=>{
    var lineReader = readline.createInterface({
        input: fs.createReadStream('out.csv')
    });
    lineReader.on('line', fileId=>{
        driveApi.files.delete({ auth: auth, fileId: fileId},function(err,response){
            if(err&&err.code==404)return; // file already deleted
            if(err){
                console.log(err.code);
            }else{
                console.log(`delete ${fileId}`);
            }
        });
    });
});
