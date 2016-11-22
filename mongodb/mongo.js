/**
 * Have database local
 * inside are 3 collections named kuk1, kuk2, kuk3
 * each collection has one document with attribute name
 * name contains name of collection
 */
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var arrayOfCollectionName=['kuk1', 'kuk2','kuk3'];
MongoClient.connect('mongodb://192.168.99.100:27017/local', function(err, db) {
    var dataFromCollections = [];
    var processDbName = function(collectionName, dbNameCb){
        db.collection(collectionName).findOne({}, function(err, data){
            dataFromCollections.push(data.name);
            dbNameCb();
        });
    };
    var finallyCb = function(error){
        console.log(dataFromCollections);
        db.close();
    };
    async.each(arrayOfCollectionName, processDbName, finallyCb);
});
