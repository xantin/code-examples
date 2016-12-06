'use strict';
const googleapisHelper=require('./googleapisHelper');
const google=require('googleapis');
const driveApi=google.drive('v3');
const fs=require('fs');
googleapisHelper.auth((auth)=>{
    const regex=new RegExp('^[0-9a-z]{40}$'); // suspicious file pattern
    run(auth, regex);
});
let run=(auth, regex, filename='out.csv')=>{
    let writer = fs.createWriteStream(filename);
    let findAndStoreIntoFileSuspiciousFiles=(writer, auth, suspiciousFilesCount, totalFilesCount, pageToken)=>{
        let options={
            auth: auth,
            pageSize: 1000,
            fields: "nextPageToken, files(id, name)"
        };
        if (pageToken){
            options.pageToken=pageToken;
        };
        driveApi.files.list(options, function(err, response) {
            if (err) {
                console.log('The API returned an error: '+err);
                return;
            }
            let files = response.files;
            totalFilesCount+=files.length;
            let suspiciousFiles=files.filter(function(object){
                return object.name.match(regex);
            });
            suspiciousFilesCount+=suspiciousFiles.length;
            suspiciousFiles.map(function(file){writer.write(file.id+"\n"); return file.id});
            if(response.nextPageToken){
                findAndStoreIntoFileSuspiciousFiles(writer, auth, suspiciousFilesCount, totalFilesCount, response.nextPageToken);
            } else {
                writer.end();
                console.log(`your data are stored in ${filename} were found ${suspiciousFilesCount} suspicious files of ${totalFilesCount}`);
            }
        });
    };
    findAndStoreIntoFileSuspiciousFiles(writer, auth, 0, 0, null);
};
