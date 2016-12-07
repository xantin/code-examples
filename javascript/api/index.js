const request=require('request')

var query='?$select=ID,Title,Session_x0020_Page_x0020_URL,Course/Id&$orderby=Start_x0020_Date';
var endpoint="/_api/web/lists/getbytitle('Courses')/Items";
var url='https://ps1.merchantware.net/Merchantware/ws/RetailTransaction/v4/Credit.asmx';
var opts={
    url: url+endpoint,
};
request(opts, function(err, response, body){
    console.log(err);
    // console.log(response.code);
    // console.log(body);
});

// https://ps1.merchantware.net/Merchantware/ws/RetailTransaction/v4/Credit.asmx/_api/web/lists/getbytitle('Courses')/Items