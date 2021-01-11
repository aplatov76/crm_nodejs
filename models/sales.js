const pool = require('../config/db.config');

class SalesQueryes{
    
    static getToDay(){

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

    static addSale(products){

        //console.log(products)

        //console.log([products.map(item => [null, item.id, item.quantity, item.price, item.sum, 3])]);
        let quer = 'call addSales(?, @out)';            

        return new Promise((resolve, reject) => {
           
        pool.getConnection((err, connection) => {
            if (err)reject(err);
            
            connection.query(quer, JSON.stringify(products.map(item => item)), (err, rows) => {
                 if (err) {
                    reject(err);
                }
                console.log(rows)
                resolve(rows);
                
                connection.release();
            });
        });
     });
    }

}

module.exports = SalesQueryes;