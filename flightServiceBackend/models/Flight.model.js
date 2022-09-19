const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNumber: {
        type: Number,
        min: [1000, 'Flight numbers must be between 1000-9999.'],
        max: [9999, 'Flight numbers must be between 1000-9999.'],
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentPassengers: {
        type: Number,
        min: [0, 'Flights cannot have fewer than 0 passengers.'],
        max: [545, 'The largest plane available has a capacity of 545.'],
        required: true
    }
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;