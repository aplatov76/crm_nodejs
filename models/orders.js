const pool = require('../config/db.config');

class OrdersQueryes{
    
    static getAll(){

        let quer = 'SELECT * FROM orders LEFT JOIN clients ON orders.clientId = clients.id;';            

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

    static addOrder(order){

        //console.log(products)

        //console.log([products.map(item => [null, item.id, item.quantity, item.price, item.sum, 3])]);
        let quer = '';            

        return new Promise((resolve, reject) => {
           
        pool.getConnection((err, connection) => {
            if (err)reject(err);
            
            connection.query(quer, JSON.stringify({}), (err, rows) => {
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

    static getId(id){

        let quer = 'SELECT ordersProducts.*, prais.title FROM `ordersProducts`  LEFT JOIN `prais` ON ordersProducts.productId = prais.id WHERE ordersProducts.orderId = ?  UNION SELECT op.*, orders.total, (SELECT (orders.total - SUM(ordersPayments.sum)) FROM ordersPayments WHERE ordersPayments.data <= op.data AND ordersPayments.orderId =?)  as currentPay, null FROM `ordersPayments` AS op LEFT JOIN orders ON op.orderId = orders.id WHERE orderId = ?';
        //let quer_1 = 'SELECT * FROM `ordersPayments` WHERE orderId = ?';            

        return new Promise((resolve, reject) => {
        
            pool.getConnection((err, connection) => {

                if (err)reject(err);
                
                connection.query(quer, [id, id, id], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                    connection.release();
                    //resolve(rows);
                });
                // connection.query(quer_1, id, (err, rows) => {
                //     if (err) {
                //         reject(err);
                //     }
                //     //resolve(rows);
                //     arr.payments = rows;
                //     connection.release();
                // });

                
            });
        });
    }

}

module.exports = OrdersQueryes;