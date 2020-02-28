
//! Setting for server
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

//!app.use(express.static("public"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//!Set Handlebars.
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//!Require controllers file
const routes = require("./controllers/burgers_controller.js");
app.use(routes);
//!Start up server
app.listen(PORT, function () {
    console.log("Server listening on http://localhost:" + PORT);
});