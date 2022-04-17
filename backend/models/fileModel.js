const mongoose = require('mongoose');


const fileSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },

    filename: {
        type: "String",
        require: [false, ''],
    },
    code: {
        type: "String",
        require: [false, ''],
    },
    commentId: {
        type: String,
        required: [false, ''],
    },
    comments: [{
        height: {
            type: Number,
            required: [false, ''],
        },
        title: {
            type: String,
            required: [false, ''],
        },
        input: {
            type: String,
            required: [false, ''],
        },
    }]

}, {
    timestamps: true,
});

module.exports = mongoose.model('Files', fileSchema)