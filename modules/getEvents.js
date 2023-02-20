const mysql = require('mysql2/promise');
const config = require('./config_db');

module.exports = async function () {
    let results = [];
    const  conn = await mysql.createConnection(config);
    const [ rows, fields] = await conn.execute('SELECT id, name, descr, place, date AS `datetime`, DATE_FORMAT( `date` , \'%c-%e\' ) AS `date`, DATE_FORMAT( `date` , \'%e %M\' ) AS `dateFull`, category  FROM `events` ORDER BY datetime DESC');
    conn.end();
    for (let i=0; i<rows.length; i++){
        results.push(rows[i]);
    }
    return results;
}