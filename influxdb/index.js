const settings = require('./settings.js');
const Influx = require('influx');
const influx = new Influx.InfluxDB(settings);

influx.writePoints([
  {
    measurement: 'kuk',
    tags: { host: 'david' },
    fields: { path: 'path' },
  }
]).then(() => {
  console.log('obj');
  return influx.query(`
    select * from "kuk"
    order by time desc
    limit 10
  `)
}).then(rows => {
  rows.forEach(row => console.log(`A request to ${row.path} took ${row.time}ms`))
}).catch(function(e){
  console.error(e);
})
