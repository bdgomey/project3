import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { Nav, NavItem, NavLink, NavSection } from '../components/Nav';

export const AppNav = () => {
    const theme = useContext(ThemeContext);

    return (
        <Nav backgroundColor={theme.backgroundColor} color={theme.color}>
            <NavSection jc="flex-start">
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/flights">Flights</NavLink>
                </NavItem>
            </NavSection>
            <NavSection jc="flex-end">
                <NavItem>
                    <NavLink to="/"><strong>Ted Striker's Flight Service</strong></NavLink>
                </NavItem>
            </NavSection>
        </Nav>
    );
}