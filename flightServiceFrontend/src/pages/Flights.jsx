import { FlightList } from "../components/FlightList";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Flights = () => {

    const navigate = useNavigate();

    // state for hiding sorting options in FlightList component
    const [hidden, setHidden] = useState();

    return (
        <div className="container">
            <h1>Currently Scheduled Flights
                <button onClick={() => navigate('../addFlight', {replace: true})}>Create A New Flight</button>
                {!hidden ?
                    <button onClick={() => setHidden(hidden => !hidden)}>Sorted By: Flight Number</button>
                : null}
                {hidden ?
                    <button onClick={() => setHidden(hidden => !hidden)}>Sorted By: Departure Date</button>
                : null}
            </h1>
            {/* passing hidden state to FlightList */}
            <FlightList hiddenState={hidden} />
            <Footer />
        </div>
    )
}