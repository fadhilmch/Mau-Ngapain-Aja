const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    title:String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
});

module.exports = mongoose.model('User', userSchema);
