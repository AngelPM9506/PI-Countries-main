import { Component } from "react";
import { NavLink } from "react-router-dom";
import logoHenry from "../../img/HenryLogo2.png"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return (
            <header id="header">
                <div className="log">
                    <NavLink to='/countries'>
                        <picture>
                            <img src={logoHenry} alt="Logo henrr" />
                        </picture>
                        <h2>PI-Countries</h2>
                    </NavLink>
                </div>
                <div className="nav">
                    <nav>
                        <NavLink className="btn" to="/countries/nueva-actividad">Nueva Actividad Turistica</NavLink>
                    </nav>
                </div>
            </header>
        );
    }
}
export default NavBar;