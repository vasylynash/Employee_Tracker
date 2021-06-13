const mysql = require("mysql");

class MysqlConnection {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',

            port: 3306,

            user: 'root',

            password: 'rootroot1!',
            database: 'employee_tracker_db',
        });
    }

    query(query, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        });
    }

    end() {
        this.connection.end();
    }

}

module.exports = new MysqlConnection();