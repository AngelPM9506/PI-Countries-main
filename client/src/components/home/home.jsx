/**dependencias */
import { Component } from "react";
import { connect } from "react-redux";
/**actions de redux */
import { getCountries, getTrevels, getContinents, sortCountries } from "../../store/actions";
/**componentes */
import ItemCountry from "../ItemCountry/itemCountry";
import Pagination from "../paginacion/paginacion";
import Loading from "../loadingContent/loading";
/**estilos  */
import styles from './home.module.css';
/**componente */
class Home extends Component {
    constructor(props) {
        super(props);
        this.body = document.querySelector('#body');
        this.state = {
            filterContinet: '',
            filterTravel: '',
            orden: '',
            ordenBy: '',
            pagina: 1,
            porPagina: 9,
            goPage: 1,
            maximo: 0,
            filtred: false
        }
    }
    componentDidMount() {
        if (!this.body.classList.contains('count')) this.body.classList.add('count');
        if (this.props.loadedCountries.length === 0) this.props.getCountries().then(() => this.changeMaximo());
        this.props.getTrevels();
        this.props.getContinents();
        this.changePorPagina()
    }
    changeMaximo = () => {
        this.setState({ maximo: Math.ceil(this.props.nCountries / this.state.porPagina) });
    }
    setFilterValue(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    filterCountries() {
        let { filterContinet, filterTravel, orden, ordenBy } = this.state;
        this.setState({ filtred: true })
        this.props.sortCountries(filterContinet, filterTravel, orden, ordenBy)
            .then(() => {
                this.setState(
                    { pagina: 1 },
                    () => this.changePorPagina()
                );
            });
    }
    retunFirstPage = () => {
        this.setState({ pagina: 1 });
    }
    changePorPagina = () => {
        if (this.state.pagina === 1) {
            this.setState(
                { porPagina: 9 },
                () => this.changeMaximo()
            );
        } else {
            this.setState(
                { porPagina: 10 },
                () => this.changeMaximo()
            );
        }
    }
    toLeft = () => {
        if (this.state.pagina <= 1) {
            return this.setState({ pagina: 1 });
        }
        this.setState({ pagina: this.state.pagina - 1 }, () => this.changePorPagina());
    }
    toPage = (event) => {
        this.setState({ goPage: event.target.value });
    }
    goPage = (e) => {
        e.preventDefault();
        e.target.pagina.value = '';
        let { nCountries } = this.props;
        if (isNaN(parseInt(this.state.goPage))) {
            return;
        }
        if (this.state.goPage >= Math.ceil(nCountries / 10)) {
            return this.setState({ pagina: Math.ceil(nCountries / 10) }, () => this.changePorPagina());
        } else if (this.state.goPage <= 1) {
            return this.setState({ pagina: 1 }, () => this.changePorPagina());
        } else {
            return this.setState({ pagina: parseInt(this.state.goPage) }, () => this.changePorPagina());
        }
    }
    toRight = () => {
        if (this.state.pagina >= this.state.maximo) {
            return this.setState({ pagina: this.state.maximo });
        }
        this.setState({ pagina: this.state.pagina + 1 }, () => this.changePorPagina());
    }
    render() {
        let { pagina, porPagina } = this.state;
        let { loadedCountries, loadingCom } = this.props
        let { home, campo, countries, encabezado, filtros } = styles;
        return (
            <main className={"contenedor " + home}>
                <section className={encabezado}>
                    <h1>{this.props.nCountries} Paises</h1>
                    <article className={filtros}>
                        <div className={campo}>
                            <select name="filterContinet" id="filterContinet" onChange={e => this.setFilterValue(e)}>
                                <option value="" >--Por Continent--</option>
                                {this.props.continents.length > 0 && this.props.continents.map((continente, i) => {
                                    return (
                                        <option key={i} value={continente}>{continente}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={campo}>
                            <select name="filterTravel" id="filterTravel" onChange={e => this.setFilterValue(e)}>
                                <option value="" >--Por Actividad--</option>
                                {this.props.loadedTravels && this.props.loadedTravels.map((travel, i) => {
                                    return (
                                        <option key={i} value={travel.name}>{travel.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={campo}>
                            <select name="orden" id="orden" onChange={e => this.setFilterValue(e)}>
                                <option value='ASC'>Ascendente</option>
                                <option value='DESC'>Descendente</option>
                            </select>
                        </div>
                        <div className={campo}>
                            <select name="ordenBy" id="ordenBy" onChange={e => this.setFilterValue(e)}>
                                <option value='name'>Alfavetico</option>
                                <option value='poblacion'>Poblacion</option>
                            </select>
                        </div>
                        <button onClick={() => this.filterCountries()}>Filtrar y ordenar</button>
                    </article>
                </section>
                <Pagination
                    pagina={pagina}
                    maximo={this.state.maximo}
                    toRight={this.toRight}
                    toLeft={this.toLeft}
                    toPage={this.toPage}
                    goPage={this.goPage}
                    retunFirstPage={this.retunFirstPage}
                    changeMaximo={this.changeMaximo}
                />
                <section className={countries}>
                    {loadingCom && <Loading />}
                    {loadedCountries && loadedCountries.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map((country, i) => {
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
                    {this.state.filtred && loadedCountries.length === 0 ? <h4 className="alerta rojo">No se encontro Ningun pais con tal conbinacion de filtros</h4> : ''}
                </section>
            </main>
        )
    }
}

const mapState = state => {
    return {
        loadedCountries: state.loadedCountries,
        loadedTravels: state.loadedTravels,
        continents: state.continents,
        nCountries: state.nCountries,
        loadingCom: state.loadingCom
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