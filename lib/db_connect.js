var mongoose = require('mongoose');

var env_url = {
    "test": "mongodb://localhost:27017/sales",
    "development": "mongodb://localhost:27017/sales"
};
var url = env_url[process.env.NODE_ENV || "development"];

module.exports = mongoose.connect(url);