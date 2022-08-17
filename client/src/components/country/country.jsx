import { Component } from "react";
import { connect } from "react-redux";
import { getDetailsCountry } from '../../store/actions'
import Travel from "../travel/travel";

class Country extends Component {
    constructor(props) {
        super(props);
        this.body = document.querySelector('#body');
    }
    componentDidMount() {
        if (!this.body.classList.contains('count')) this.body.classList.add('count');
        const { match: { params: { code } } } = this.props;
        this.props.getDetailsCountry(code);
    }
    render() {
        var {
            name,
            image,
            code,
            capital,
            subregion,
            area,
            poblacion,
            travels
        } = this.props.detailCountry;
        return (
            <main className="contenedor countryDetails">
                <section className="caratula">
                    <h2>{name && name}</h2>
                </section>
                <section className="details">
                    <article className="dataCountry">
                        <h3>Detalles</h3>
                        <div className="detail">
                            <p>Codigo: </p><span>{code && code}</span>
                        </div>
                        <div className="detail">
                            <p>Capital: </p><span>{capital && capital}</span>
                        </div>
                        <div className="detail">
                            <p>Subregion: </p><span>{subregion && subregion}</span>
                        </div>
                        <div className="detail">
                            <p>Area: </p><span>{area && (area / 1000000).toFixed(3)} Millones de km<sup>2</sup></span>
                        </div>
                        <div className="detail">
                            <p>Poblacion: </p><span>{poblacion && (poblacion / 1000000).toFixed(3)} Millones de personas</span>
                        </div>
                        <div className="bandera">
                            <picture>
                                <source srcSet={image && image[1]} />
                                <img src={image && image[0]} alt="" />
                            </picture>
                        </div>
                    </article>
                    <article className="travels">
                        <h3>Actividades Turisticas</h3>
                        <div>
                            {
                                travels && travels.length > 0 ? travels.map((travel, i) => {
                                    return (
                                        <Travel
                                            key={i}
                                            name={travel.name}
                                            dificultad={travel.dificultad}
                                            duracion={travel.duracion}
                                            temporada={travel.temporada}
                                        />
                                    )
                                }) : <h4 className="alerta rojo">No hay Actividades por el momento</h4>
                            }
                        </div>
                    </article>
                </section>
            </main>
        );
    }
}
const mapState = state => {
    return {
        detailCountry: state.detailCountry
    }
}

const mapDispatch = dispatch => {
    return {
        getDetailsCountry: code => dispatch(getDetailsCountry(code))
    }
}
export default connect(mapState, mapDispatch)(Country);