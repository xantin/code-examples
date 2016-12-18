var pdf = require('html-pdf');
var options = { format: 'Letter' };
var html="<h1>dfdsffs</h1>";
pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});