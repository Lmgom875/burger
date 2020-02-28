//! require ORM file
const orm = require("../config/orm");

//! Varible "burger" with all ORM functions to manipulate DB
let burger = {
    selectAll: function (cd) {
        orm.selectAll("burgers", function (res) {
            cd(res);
        });
    },
    insertOne: function (cols, val, cd) {
        orm.insertOne("burgers", cols, val, function (res) {
            cd(res);
        });
    },
    updateOne: function (colsVal, cond, cd) {
        orm.updateOne("burgers", colsVal, cond, function (res) {
            cd(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("burgers", condition, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;