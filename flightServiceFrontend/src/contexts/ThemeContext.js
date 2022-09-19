import { createContext } from "react";

export const themes = {
    light: {
        backgroundColor: '#F6F5F5',
        color: 'black'
    },
    dark: {
        backgroundColor: '#221D1D',
        color: 'white'
    }
};

const ThemeContext = createContext(themes.light);

export default ThemeContext;