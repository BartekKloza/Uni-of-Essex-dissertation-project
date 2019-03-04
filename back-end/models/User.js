const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    weatherSettings: {
        type: Array,
        // golf -> sailing -> horses
        // temperature, windspeed, chanceofrain x3
        default: [20, 5, 0.4, 10, 10, 0.1, 0, 20, 0.1]
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;