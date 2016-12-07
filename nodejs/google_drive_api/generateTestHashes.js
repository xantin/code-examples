'use strict';
const Chance = require("chance");
const fs = require("fs");
const async = require("async");
const chance = new Chance();
let opts={length: 40, pool: 'abcdefghijklmopqrstuvwxyz0123456789'};
let folderName='hashes';
const createFiles=400000;
let count = 1;
async.whilst(
    function() { return count <= createFiles; },
    function(callback) {
        let name=chance.string(opts);
        let filePath=`${folderName}/${name}`;
        fs.stat(filePath, (err)=>{
            if(err){
                return fs.writeFile(filePath, '', (err) => {
                    if (err){
                        return callback(err);
                    }
                    callback(null, count++);
                });
            }
            callback(null, count)
        });
    },
    function (err, n) {
        console.log('finished');
    }
);