const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title:String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('List', listSchema);
