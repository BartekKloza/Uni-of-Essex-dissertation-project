const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    activity: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('bookings', BookingSchema);

module.exports = Booking;