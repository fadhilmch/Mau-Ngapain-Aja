const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text:String,
    due_date:Date,
    starred:Boolean,
    status:Boolean,
}).pre('save', function(){
    if(this.starred != true)
        this.starred = false;
    this.status = false;
})

module.exports = mongoose.model('Todo', todoSchema);
