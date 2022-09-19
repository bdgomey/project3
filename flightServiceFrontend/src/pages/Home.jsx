import homeImage from '../images/home.jpg';
import { useNavigate } from "react-router-dom";
import { Footer } from '../components/Footer';

export const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Welcome To Ted Striker's Flight Service!<span>➤ Confidence &amp; Sobriety Since 1980</span></h1>
            <div className='homeContent'>
                <h2>"Striker, listen, and you listen close — flying a plane is no different than riding a bicycle, just a lot harder to put baseball cards in the spokes."</h2>
                <hr></hr>
                <p>Here at Ted Striker's Flight Service, we pride ourselves on reasonably low blood alcohol content and an unwavering commitment to simply climbing into the cockpit and seeing what the heck happens.</p>
                <p>Equipped with semi-trained support staff, frequent joke callbacks, and tangential experience, we guarantee to get you where you're going in one or more pieces.</p>
                <p>We thank you kindly for choosing Ted Striker's Flight Service, and may you rest in peace.</p>
            </div>
            <img className="homeImage" src={homeImage} alt="Ted Striker's Flight Service" />
            <button onClick={() => navigate('../Flights', {replace: true})}>I just wanted to say good luck, and we're all counting on you.</button>
            <Footer />
        </div>
    )
}