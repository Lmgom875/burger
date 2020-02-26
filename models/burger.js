const orm = require("../config/orm");

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
    }
};

module.exports = burger;