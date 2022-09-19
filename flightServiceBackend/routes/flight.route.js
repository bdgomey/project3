const router = require('express').Router();
const { findAllFlights, createFlight, deleteFlight, updateFlight } = require('../controllers/flight.controller');
const Flight = require('../models/Flight.model');

// GET all
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.status(200).json(flights);
});

// ADD one
router.post('/', async (req, res) => {
    try {
        // validate flight number range
        if (req.body.flightNumber < 1000 || req.body.flightNumber > 9999) {
            res.status(406).json('Flight number must be between 1000 and 9999.');

        // check for duplicate flight number
        } else if (await Flight.findOne({ flightNumber: req.body.flightNumber })) {
            res.status(406).json('A flight with this flight number already exists.');

        // check that flight doesn't stay in one place
        } else if (req.body.departureAirport == req.body.arrivalAirport) {
            res.status(406).json('Arrival airport must be different from departure airport.');
        
        // check that flight doesn't leave before today
        } else if (parseInt(req.body.departureDate.replace(/-/g, '')) 
                 < parseInt(new Date().toJSON().slice(0, 10).replace(/-/g, ''))) {
            res.status(406).json('Departure date must be on or after today\'s date.');
        
        // check that flight doesn't depart after it arrives (date)
        } else if (parseInt(req.body.departureDate.replace(/-/g, '')) 
                 > parseInt(req.body.arrivalDate.replace(/-/g, ''))) {
            res.status(406).json('Arrival date must be on or after departure date.');

        // check that flight doesn't depart after it arrives (time on same date)
        } else if ((req.body.departureDate == req.body.arrivalDate) 
                && (parseInt(req.body.departureTime.replace(':', '')) 
                  > parseInt(req.body.arrivalTime.replace(':', '')))) {
            res.status(406).json('Arrival time must be on or after departure time.');

        // validate capacity range
        } else if (req.body.capacity < 1 || req.body.capacity > 545) {
            res.status(406).json('Flight capacity must be between 1 and 545.');

        // check that number of passengers doesn't exceed capacity
        } else if (req.body.currentPassengers > req.body.capacity) {
            res.status(406).json('Number of current passengers must not exceed flight capacity.');

        // check for missing fields
        } else if (req.body.flightNumber === '' 
                || req.body.departureDate === '' 
                || req.body.departureTime === '' 
                || req.body.arrivalDate === '' 
                || req.body.arrivalTime === '' 
                || req.body.currentPassengers === '' 
                || req.body.capacity === '') {
            res.status(406).json('All fields must be filled in to create a new flight.');

        } else {
            const flightId = await createFlight(req.body);
            res.status(201).json({_id: flightId});
        }
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// DELETE one
router.delete('/:flightNumber', async (req, res) => {
    try {
        const deletedFlightNumber = await deleteFlight(req.params.flightNumber);
        res.status(200).json({ deletedFlightNumber });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// UPDATE one
router.put('/', async (req, res) => {
    try {
        // validate flight number range
        if (req.body.flightNumber < 1000 || req.body.flightNumber > 9999) {
            res.status(406).json('Flight number must be between 1000 and 9999.');

        // check for duplicate flight number (except previous version of this flight)
        } else if (await Flight.findOne({ flightNumber: req.body.flightNumber }) 
                && req.body.flightNumber != req.body.oldFlightNumber) {
            res.status(406).json('A flight with this flight number already exists.');

        // check that flight doesn't stay in one place
        } else if (req.body.departureAirport == req.body.arrivalAirport) {
            res.status(406).json('Arrival airport must be different from departure airport.');

        // check that flight doesn't leave before today
        } else if (parseInt(req.body.departureDate.replace(/-/g, '')) 
                 < parseInt(new Date().toJSON().slice(0, 10).replace(/-/g, ''))) {
            res.status(406).json('Departure date must be on or after today\'s date.');

        // check that flight doesn't depart after it arrives (date)
        } else if (parseInt(req.body.departureDate.replace(/-/g, '')) 
                 > parseInt(req.body.arrivalDate.replace(/-/g, ''))) {
            res.status(406).json('Arrival date must be on or after departure date.');

        // check that flight doesn't depart after it arrives (time on same date)
        } else if ((req.body.departureDate == req.body.arrivalDate) 
                && (parseInt(req.body.departureTime.replace(':', '')) 
                  > parseInt(req.body.arrivalTime.replace(':', '')))) {
            res.status(406).json('Arrival time must be on or after departure time.');

        // validate capacity range
        } else if (req.body.capacity < 1 || req.body.capacity > 545) {
            res.status(406).json('Flight capacity must be between 1 and 545.');

        // check that number of passengers doesn't exceed capacity
        } else if (req.body.currentPassengers > req.body.capacity) {
            res.status(406).json('Number of current passengers must not exceed flight capacity.');

        // check for missing fields
        } else if (req.body.flightNumber === '' 
                || req.body.departureDate === '' 
                || req.body.departureTime === '' 
                || req.body.arrivalDate === '' 
                || req.body.arrivalTime === '' 
                || req.body.currentPassengers === '' 
                || req.body.capacity === '') {
            res.status(406).json('All fields must be filled in to create a new flight.');

        } else {
            const updatedFlight = await updateFlight(req.body);
            res.status(201).json({ updatedFlight });
        }
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

module.exports = router;