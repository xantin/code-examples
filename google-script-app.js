/**
Base on search criterias
Delete files

Before running you need to enable Drive API integration via: Resources -> Advanced Google Services -> Drive API (switch on)

 quotas: https://developers.google.com/apps-script/guides/services/quotas
another option to write API calling: https://developers.google.com/drive/v2/reference/files/delete
docs: https://developers.google.com/apps-script/reference/drive/file
https://script.google.com
inspiration: http://stackoverflow.com/questions/19614583/google-apps-script-to-delete-all-files-from-google-drive
*/
function main(){
  function getFiles(){
    var continuationToken = UserProperties.getProperty('DELETE_ALL_FILES_CONTINUATION_TOKEN');
    Logger.log('continuationToken: '+continuationToken);
    if (continuationToken == null) {
      // firt time execution, get all files from drive
      var files = DriveApp.getFiles();
      // get the token and store it in a user property
      var continuationToken = files.getContinuationToken();
      UserProperties.setProperty('DELETE_ALL_FILES_CONTINUATION_TOKEN', continuationToken);
    } else {
      // we continue to execute (and move everything to trash)
      var files = DriveApp.continueFileIterator(continuationToken);
    }
    return files;
  }
  function findFilesByRegex(regEx, fileCallback) {
    var files = getFiles();
    while (files.hasNext()) {
      var file = files.next();
      var filename=file.getName();
      if(filename.match(regExp)){
        fileCallback(file);
      }
    }
    UserProperties.deleteProperty('DELETE_ALL_FILES_CONTINUATION_TOKEN');
  }
  var regExp = new RegExp('^[0-9a-z]{40}$');// this is what we delete! care... though
  findFilesByRegex(regExp, function(file){
    Logger.log(file.getName() + 'Removed');
    Drive.Files.remove(file.getId());
  });
}