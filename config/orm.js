//! require connection
const connection = require("./connection");

//! for function to put ? on querys
function printQuestionMarks(num) {
    let array = [];
    for (i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}

//! function to fix objests for updates (not necessary on this add, the add just update a boolean valor)
function objToSql(ob) {
    let array = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}

//! ORM Function
let orm = {
    //! To select all on the DB
    selectAll: function (tableImput, cb) {
        let query = "SELECT * FROM " + tableImput + ";";
        connection.query(query, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    //! To insert new object to the DB
    insertOne: function (table, colm, valor, cd) {
        let query = "INSERT INTO " + table;
        query += " (";
        query += colm.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(valor.length);
        query += ")";
        connection.query(query, valor, function (err, res) {
            if (err) { throw err };
            cd(res);
        })
    },
    //! To update a object on the DB (in this app only update the devoured boolean status)
    updateOne: function (table, colm, cond, cd) {
        let query = "UPDATE " + table;
        query += " SET ";
        query += objToSql(colm);
        query += " WHERE ";
        query += cond;
        connection.query(query, function (err, res) {
            if (err) { throw err };
            cd(res);
        });
    },
    //! To delete a object on DB (in this app have to devoured first)
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }

}



module.exports = orm;

