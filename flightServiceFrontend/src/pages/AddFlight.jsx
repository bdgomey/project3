import { AirportSelector } from '../components/AirportSelector';
import { Footer } from '../components/Footer';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import addFlightImage from '../images/add-flight-2.jpg';

export const AddFlight = () => {

    // using Ref to store fields as information is updated
    const flightNumberRef = useRef();
    const departureAirportRef = useRef();
    const departureDateRef = useRef();
    const departureTimeRef = useRef();
    const arrivalAirportRef = useRef();
    const arrivalDateRef = useRef();
    const arrivalTimeRef = useRef();
    const currentPassengersRef = useRef();
    const capacityRef = useRef();

    const navigate = useNavigate();

    // POST the new flight
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8085/flights', 
                            {   flightNumber: flightNumberRef.current.value, 
                                departureAirport: departureAirportRef.current.value, 
                                departureDate: departureDateRef.current.value, 
                                departureTime: departureTimeRef.current.value, 
                                arrivalAirport: arrivalAirportRef.current.value, 
                                arrivalDate: arrivalDateRef.current.value, 
                                arrivalTime: arrivalTimeRef.current.value, 
                                currentPassengers: currentPassengersRef.current.value, 
                                capacity: capacityRef.current.value });
            navigate('../flights', {replace: true});
        } catch (error) {
            document.getElementById('errorMessage').innerText = error.response.data;
        }
    }

    return (
        <div className='container'>
            <h1>Add Flight</h1>
            <form className='addFlightForm' onSubmit={handleSubmit} action="#">
                <div className='labels'>
                    <label for="flightNumber"><strong>FLIGHT NUMBER: </strong></label>
                    <label for="departureAirport"><strong>➤ Departs: </strong></label>
                    <label for="departureDate">On: </label>
                    <label for="departureTime">At: </label>
                    <label for="arrivalAirport"><strong>⇥ Arrives: </strong></label>
                    <label for="arrivalDate">On: </label>
                    <label for="arrivalTime">At: </label>
                    <label for="currentPassengers"><strong>Passengers: </strong></label>
                    <label for="capacity">Max: </label>
                </div>
                <div className='inputs'>
                    <input id="flightNumber" type={"number"} min={0} placeholder={1980} ref={flightNumberRef}></input>
                    <select id="departureAirport" ref={departureAirportRef}>
                        {/* Airport Selector always the same here and in Update Flight */}
                        <AirportSelector />
                    </select>
                    <input id="departureDate" type={"date"} ref={departureDateRef}></input>
                    <input id="departureTime" type={"time"} ref={departureTimeRef}></input>
                    <select id="arrivalAirport" ref={arrivalAirportRef}>
                        <AirportSelector />
                    </select>
                    <input id="arrivalDate" type={"date"} ref={arrivalDateRef}></input>
                    <input id="arrivalTime" type={"time"} ref={arrivalTimeRef}></input>
                    <input id="currentPassengers" type={"number"} min={0} placeholder={0} ref={currentPassengersRef}></input>
                    <input id="capacity" type={"number"} min={0} placeholder={0} ref={capacityRef}></input>
                </div>
                <div className='errorInput'>
                    <p id='errorMessage'></p>
                    <input type={"submit"} value="Add Flight"></input>
                </div>
                <img src={addFlightImage} alt="Add Flights" />
            </form>
            <Footer />
        </div>
    )
}