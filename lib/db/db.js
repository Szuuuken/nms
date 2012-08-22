var mysql     = require('mysql');
var connInfos = {  
  host     : 'localhost',
  user     : 'nmsDBAcc',
  password : 'huhu12345',
  database : 'nms',
  insecureAuth : true
};
var connection;

function startConnection(){
 connection = mysql.createConnection(connInfos);
 connection.connect();
 };

function endConnection(){
 connection = connection.end();
}

exports.getUser = function getUser(userName,fn){
  startConnection();
  connection.query('SELECT id,user,password FROM user WHERE user='+ connection.escape(userName), fn);
  endConnection()
};

exports.insertUser = function insertUser(username,password){
  startConnection();
  var sq = 'INSERT INTO user (user,password) VALUES ('+connection.escape(+username)+','+ connection.escape(password)+')';
  console.log(sq);
  connection.query(sq);
  endConnection();
};
