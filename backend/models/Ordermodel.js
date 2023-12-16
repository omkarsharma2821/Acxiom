const {Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    items : Array,
    user: {type : Types.ObjectId, ref: 'users'},
    address: String,
}) 
module.exports = model('orders', mySchema);