import { Component } from "react";
import { NavLink } from "react-router-dom";
import logoHenry from "../../img/HenryLogo2.png"
import styles from './navbar.module.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        let{log, nav, btn, amarillo, azul} = styles
        return (
            <header>
                <div className={log}>
                    <NavLink to='/countries'>
                        <picture>
                            <img src={logoHenry} alt="Logo henrr" />
                        </picture>
                        <h2>PI-Countries</h2>
                    </NavLink>
                </div>
                <div className={nav}>
                    <nav>
                        <NavLink className={`${btn} ${azul}`} to="/countries">Inicio</NavLink>
                        <NavLink className={btn} to="/countries/nueva-actividad">Nueva Actividad</NavLink>
                        <NavLink className={`${btn} ${amarillo}`} to="/countries/about">Acerca de...</NavLink>
                    </nav>
                </div>
            </header>
        );
    }
}
export default NavBar;