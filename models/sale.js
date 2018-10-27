
var mongoose = require('mongoose');

var saleSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: String, required: true },
    category: {type: String, enum: ['App', 'Game', 'Movie', 'Shoes'], required: true}
});

module.exports = mongoose.model('sales', saleSchema);
