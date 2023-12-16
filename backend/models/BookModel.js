const {Schema, model } = require('../connection');

const mySchema = new Schema({
    publication : String,
    title : String,
    author : String,
    price : Number,
    yearsold : Number,
    image: String
})

module.exports = model('book', mySchema);