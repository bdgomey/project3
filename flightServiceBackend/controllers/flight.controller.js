const Flight = require('../models/Flight.model');

// GET all
const findAllFlights = async (limit=0) => {
    const flights = await Flight.find();
    return flights;
}

// ADD one
const createFlight = async ({flightNumber, 
                             departureDate, 
                             arrivalDate, 
                             departureTime, 
                             arrivalTime, 
                             departureAirport, 
                             arrivalAirport, 
                             capacity, 
                             currentPassengers=0}) => {
    try {
        const flight = new Flight({
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            capacity,
            currentPassengers
        });
        await flight.save();
        return flight._id;
    } 
    catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

// DELETE one
const deleteFlight = async flightNumber => {
    try {
        const flight = await Flight.deleteOne({ flightNumber });
        return flight;
    } catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

// UPDATE one
const updateFlight = async ({ _id, 
                              flightNumber, 
                              departureAirport, 
                              departureDate, 
                              departureTime, 
                              arrivalAirport, 
                              arrivalDate, 
                              arrivalTime, 
                              currentPassengers, 
                              capacity }) => {
    try {
        const flight = await Flight.findOneAndUpdate({ _id }, { flightNumber, 
                                                                departureAirport, 
                                                                departureDate, 
                                                                departureTime, 
                                                                arrivalAirport, 
                                                                arrivalDate, 
                                                                arrivalTime, 
                                                                currentPassengers, 
                                                                capacity });
        return flight;
    } catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}

module.exports = { findAllFlights, createFlight, deleteFlight, updateFlight };