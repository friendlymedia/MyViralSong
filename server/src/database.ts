import mysql from 'promise-mysql';
import dbConnection from './dbConnection'

const db = mysql.createPool(dbConnection.database);

//Make connection with our Database
db.getConnection().then(connection => {
    db.releaseConnection(connection);
    console.log('DB Connection')
})

export default db;