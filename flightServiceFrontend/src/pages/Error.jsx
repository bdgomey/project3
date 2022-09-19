import { Footer } from "../components/Footer"

export const Error = () => {
    return (
        <div className="container">
            <h1>Mayday! Mayday!</h1>
            <div className='errorContent'>
                <h2>The page you requested<br />does not exist.</h2>
                <p>There's no reason to become alarmed, and we hope you'll enjoy the rest of your flight.</p>
                <p>By the way, is there anyone on board who knows how to fly a plane?</p>
            </div>
            <Footer />
        </div>
    )
}