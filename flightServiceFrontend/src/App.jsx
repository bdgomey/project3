import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppNav } from './features';
import { Home, Flights, AddFlight, UpdateFlight, Error } from './pages';
import ThemeContext, { themes } from './contexts/ThemeContext';
import './stylesheets/flightService.css'

const App = () => {
    
    const [currTheme] = useState(themes.light);

    return (
        <ThemeContext.Provider value={currTheme}>
            <BrowserRouter>
                <AppNav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/flights" element={<Flights />} />
                        <Route path="/addFlight" element={<AddFlight />} />
                        <Route path="/updateFlight" element={<UpdateFlight />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );   
}

export default App;