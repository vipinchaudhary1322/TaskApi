const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
        title: {
                type: String
        },
        is_completed: {
                type: Boolean
        }
})


const todomodel = mongoose.model("Tasks", todoSchema);

module.exports = todomodel;