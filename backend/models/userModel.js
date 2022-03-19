const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    }, 
    token: {
        type: String,
        require: [false, ''],
    },
    confirmPassword: {
        type: String,
        require: [false, ''],
    }
}, {
    timestamps: true,
});



module.exports = mongoose.model('User', userSchema)

// const forgotSchema = mongoose.Schema({
//     email: {
//         type: String,
//         required: [true, 'Please add an email'],
//     },
//     token: {
//         type: String,
//         required: [true, 'Please add a token'],
//     }, 
// }, {
//     timestamps: true,
// });

// module.exports = mongoose.model('forgotUser', forgotSchema)
