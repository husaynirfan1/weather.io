// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());   

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));   

// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to Nodejs Simple REST API application." });
});

require("./app/routes/property.routes.js")(app);   

// Listen on the port provided by Render
app.listen(process.env.PORT || 8080, () => {
console.log(Server is running on port ${process.env.PORT || 8080}.);
});
