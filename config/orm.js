const connection = require("./connection");


function printQuestionMarks(num) {
    let array = [];
    for (i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}


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

let orm = {
    selectAll: function (tableImput, cb) {
        let query = "SELECT * FROM " + tableImput + ";";
        connection.query(query, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
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

