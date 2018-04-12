var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'user'
});
 
connection.connect();
 
connection.query('SELECT * FROM info', function (error, results, fields) {
  if (error) {
    
    console.log('[SELECT ERROR] - ',error.message);
    return;
  }
　console.log(fields);
　console.log('--------------------------SELECT----------------------------');
　console.log(results);

　console.log('------------------------------------------------------------\n\n');  
  //throw error;
  //console.log('The solution is: ', results[0].solution);
});         

connection.end();