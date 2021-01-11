const pool = require('../config/db.config');

class AuthQueryes{
   
    static findUser(email){
        let quer = 'SELECT * FROM `auth` WHERE `email` = ?;';            

        return new Promise((resolve, reject) => {
           
        pool.getConnection((err, connection) => {
            if (err)reject(err);
            
            connection.query(quer, [email], (err, rows) => {
                 if (err) {
                    reject(err);
                }

                resolve(rows[0]);
                connection.release();
            });
        });
     });
    }

    static register(user){
        let quer = 'INSERT INTO `auth` (id, email, name, password, util) VALUES (0, ?, ?, ?, ?)';            
        console.log(user.email)
        return new Promise((resolve, reject) => {
           
        pool.getConnection((err, connection) => {
            if (err)reject(err);
            
            connection.query(quer, [user.email, user.name, user.password, 0], (err, rows) => {
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

module.exports = AuthQueryes;