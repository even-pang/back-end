var oracledb = require('oracledb');
require('dotenv').config();
var config = {
    user: "ordadata",
    password: process.env.DB_PASSWORD,
    connectString: "ordadata.chrq8kiglo4q.ap-northeast-2.rds.amazonaws.com/orcl"
}
let connection = null;
oracledb.getConnection(config, (err, conn) =>{
    todoWork(err, conn);
    connection = conn;
});

function todoWork(err, connection) {
    if (err) {
        console.error(err.message);
        return;
    }
    connection.execute("select * from tb_user", [], function (err, result) {
        if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
        }
        console.log(result.metaData);  //테이블 스키마
        console.log(result.rows);  //데이터
        doRelease(connection);
    });
}    

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

module.exports = connection;