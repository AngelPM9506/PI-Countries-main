import { Component } from "react";

class Travel extends Component {
    render() {
        let {
            name,
            dificultad,
            duracion,
            temporada,
        } = this.props;
        return (
            <div className="itemTravel">
                <h4>{name && name}</h4>
                <div className="dataTravel">
                    <p>Dificultad: <span>{dificultad && dificultad}</span></p>
                    <p>Duración: <span>{duracion && duracion}</span></p>
                    <p>Temporada:  <span>{temporada && temporada}</span></p>
                </div>
            </div>
        )
    }
}

export default Travel;