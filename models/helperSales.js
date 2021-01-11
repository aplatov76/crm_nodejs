const pool = require('../config/db.config');

class HelperSales{
    
    static equalsBalance(){

        let quer = 'SELECT r.*, p.title FROM sales AS r LEFT JOIN prais AS p ON p.id = r.code WHERE DATE(`data`) = CURDATE()';            

            return new Promise((resolve, reject) => {
            
                pool.getConnection((err, connection) => {

                    if (err)reject(err);
                    
                    connection.query(quer, (err, rows) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);
                        connection.release();
                    });
                });
            });
    }

}

module.exports = HelperSales;