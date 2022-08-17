import { Component } from "react";
import { connect } from "react-redux";
import { getCountries, getTrevels, getContinents, sortCountries } from "../../store/actions";
import ItemCountry from "../ItemCountry/itemCountry";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterContinet: '',
            filterTravel: '',
            orden: '',
            ordenBy: ''
        }
        this.body = document.querySelector('#body');
    }
    componentDidMount() {
        if (!this.body.classList.contains('count')) this.body.classList.add('count');
        if (this.props.loadedCountries.length === 0) this.props.getCountries();
        this.props.getTrevels();
        this.props.getContinents();
    }
    setFilterValue(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    filterCountries() {
        let { filterContinet, filterTravel, orden, ordenBy } = this.state;
        this.props.sortCountries(filterContinet, filterTravel, orden, ordenBy);
    }
    render() {
        return (
            <main className="contenedor home">
                <section className="encabezado">
                    <h1>Home</h1>
                    <article className="filtros">
                        <div className="campo">
                            <select name="filterContinet" id="filterContinet" onChange={e => this.setFilterValue(e)}>
                                <option value="" >--Por Continent--</option>
                                {this.props.continents.length > 0 && this.props.continents.map((continente, i) => {
                                    return (
                                        <option key={i} value={continente}>{continente}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="campo">
                            <select name="filterTravel" id="filterTravel" onChange={e => this.setFilterValue(e)}>
                                <option value="" >--Por Actividad--</option>
                                {this.props.loadedTravels && this.props.loadedTravels.map((travel, i) => {
                                    return (
                                        <option key={i} value={travel.name}>{travel.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="campo">
                            <select name="orden" id="orden" onChange={e => this.setFilterValue(e)}>
                                <option value="" >--Secuencia...--</option>
                                <option value='ASC'>Ascendente</option>
                                <option value='DESC'>Descendente</option>
                            </select>
                        </div>
                        <div className="campo">
                            <select name="ordenBy" id="ordenBy" onChange={e => this.setFilterValue(e)}>
                                <option value="" >--Orden...--</option>
                                <option value='name'>Alfavetico</option>
                                <option value='poblacion'>Poblacion</option>
                            </select>
                        </div>
                        <button onClick={() => this.filterCountries()}>Filtrar y ordenar</button>
                    </article>
                </section>
                <section className="countries">
                    {this.props.loadedCountries && this.props.loadedCountries.map((country, i) => {
                        return (
                            <ItemCountry
                                key={i}
                                name={country.name}
                                continente={country.continente}
                                image={country.image}
                                code={country.code}
                            />
                        )
                    })}
                </section>
            </main>
        )
    }
}

const mapState = state => {
    return {
        loadedCountries: state.loadedCountries,
        loadedTravels: state.loadedTravels,
        continents: state.continents
    }
}

const mapDispatch = dispatch => {
    return {
        getCountries: () => dispatch(getCountries()),
        getTrevels: () => dispatch(getTrevels()),
        getContinents: () => dispatch(getContinents()),
        sortCountries: (filtByContinent, filtByTravel, ordAscDesc, ordBy) => dispatch(sortCountries(filtByContinent, filtByTravel, ordAscDesc, ordBy))
    }
}

export default connect(
    mapState,
    mapDispatch
)(Home);