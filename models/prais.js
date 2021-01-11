const pool = require('../config/db.config');

class PraisQueryes{
   
    static getPrais(){
        let quer = 'SELECT id, articul, title FROM prais WHERE visible = 1';            

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

    static getById(id){
        //console.log(id)
        let quer = 'SELECT p.id, p.articul, p.title, p.price, p.stock, p.trade_price, p.parent, p.visible, p.info FROM prais AS p WHERE p.id = ?';            

            return new Promise((resolve, reject) => {
            
                pool.getConnection((err, connection) => {
                    if (err)reject(err);
                    
                    connection.query(quer ,id.id, (err, rows) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(rows[0]);
                        connection.release();
                    });
                });
            });
    }
/*
    static getByIdFullInfo(id){
        //console.log(id)
        let quer = 'SELECT p.id, p.articul, p.title, p.price, p.stock, p.trade_price, p.parent, pi.info FROM prais AS p LEFT JOIN `prais_informations` AS pi ON p.id = pi.code WHERE p.id = ?';            

            return new Promise((resolve, reject) => {
            
                pool.getConnection((err, connection) => {
                    if (err)reject(err);
                    
                    connection.query(quer ,id.id, (err, rows) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(rows);
                        connection.release();
                    });
                });
            });
    }
*/

    static getAllProducts(){
        let quer = 'SELECT * FROM `prais`;';            

            return new Promise((resolve, reject) => {
            
                pool.getConnection((err, connection) => {
                    if (err)reject(err);
                    
                    connection.query(quer , (err, rows) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(rows);
                        connection.release();
                    });
                });
            });
    }

    static saveProduct(product){
        let quer ="INSERT INTO `prais` (`id`, `articul`, `title`, `visible`, `stock`, `price`, `trade_price`, `parent`, `info`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `title`=?, `articul`=?, `visible`=?, `stock`=?, `price`=?, `trade_price`=?, `parent`=?, `info`=?;";            
        console.log(product)
        return new Promise((resolve, reject) => {
        
            pool.getConnection((err, connection) => {
                if (err)reject(err);
                
                connection.query(quer, [product.id, product.articul, product.title, product.visible, product.stock, product.price, product.trade_price, product.parent, product.info, product.title, product.articul, product.visible, product.stock, product.price, product.trade_price, product.parent, product.info], (err, rows) => {
                    console.log('quer: ', quer)
                    if (err) {
                        console.log(err)
                        reject(err);
                    }

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static getGroups(){
        let quer = 'SELECT id, title, parent FROM `prais` WHERE price IS NULL;';            

        return new Promise((resolve, reject) => {
        
            pool.getConnection((err, connection) => {
                if (err)reject(err);
                
                connection.query(quer , (err, rows) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static removeById(id){
        let quer = 'DELETE FROM `prais` WHERE `id` = ?';            

        return new Promise((resolve, reject) => {
        
            pool.getConnection((err, connection) => {
                if (err)reject(err);
                
                connection.query(quer , id, (err, rows) => {
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

module.exports = PraisQueryes;