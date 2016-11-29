/**
Base on search criterias
Delete files

Before running you need to enable Drive API integration via: Resources -> Advanced Google Services -> Drive API (switch on)

another option to write API calling: https://developers.google.com/drive/v2/reference/files/delete
docs: https://developers.google.com/apps-script/reference/drive/file
*/
function main(){
  function findFilesByRegex(regEx, fileCallback) {
    var files = DriveApp.getFiles();
    var filesCount=0;
    while (files.hasNext()) {
      var file = files.next();
      var filename=file.getName();
      if(filename.match(regExp)){
        fileCallback(file);
        filesCount++;
      }
    }
    Logger.log(filesCount);
  }
  var regExp = new RegExp('^[0-9a-z]{40}$');// this is what we delete! care... though
  findFilesByRegex(regExp, function(file){
    Logger.log(file.getName() + 'Removed');
    /*
    Removes the given file from the root of the user's Drive. This method does not delete the file, 
    but if a file is removed from all of its parents, it cannot be seen in Drive except by searching for it or using the "All items" view.
    */
    //DriveApp.removeFile(file);
    Drive.Files.remove(file.getId());
  });
}
