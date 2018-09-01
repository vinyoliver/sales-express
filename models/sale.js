
var mongoose = require('mongoose');

var saleSchema = mongoose.Schema({
    description: { type: String, required: true },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: {type: String, enum: ['App', 'Game', 'Movie', 'Shoes'], required: true}
});

module.exports = mongoose.model('sales', saleSchema);
