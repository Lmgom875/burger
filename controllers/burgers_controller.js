//! Require node paquekes and files
const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

//! Get route
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        let hbsObject = {
            burger: data
        };
        res.render("index", hbsObject);
    });
});

//! Post route
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId });
    });

});

//! Put route
router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    burger.updateOne({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//! Delete route
router.delete("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            //! If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;