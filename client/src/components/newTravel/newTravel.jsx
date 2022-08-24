import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { getCountries } from "../../store/actions";
import styles from './newTravel.module.css';

class NewTravel extends Component {
    constructor(props) {
        super(props);
        this.body = document.querySelector('#body');
        this.state = {
            input: {
                name: '',
                dificultad: 0,
                duracion: '',
                temporada: '',
                codes: [],
                completCodes: []
            },
            error: {},
            messages: []
        }
    }
    /** elementos que se necesitan al inicar el componenete */
    componentDidMount() {
        if (!this.body.classList.contains('count')) this.body.classList.add('count');
        if (this.props.loadedCountries.length === 0) this.props.getCountries();
    }
    /**Validar que los datos sean como se espera */
    validateCampo = (input) => {
        let error = {};
        let valTemporada = ["Verano", "Otoño", "Invierno", "Primavera"];
        //let valCode = this.props.codes.map(code => code.code);
        if (!input.name) {
            error.name = 'El nombre es obligatorio';
        }
        if (isNaN(parseInt(input.dificultad)) || parseInt(input.dificultad) < 1 || parseInt(input.dificultad) > 5) {
            error.dificultad = 'La dificultad debe de ser un numero y estar en un rango de 1 - 5'
        }
        if (!input.duracion) {
            error.duracion = 'La duración es obligatoria';
        }
        if (!valTemporada.includes(input.temporada)) {
            error.temporada = 'Solo se aceptan datos precargados';
        }
        if (this.state.input.codes.length === 0) {
            error.code = 'Debe de escoger almenos un país';
        }
        return error;
    }
    /**Verificar que nose tengan errores */
    setChengeInput = (e) => {
        if (e.target.name === 'code') {
            if (!this.state.input.codes.includes(e.target.value)) {
                this.setState({
                    input: {
                        ...this.state.input,
                        codes: [...this.state.input.codes, e.target.value],
                        completCodes: [
                            ...this.state.input.completCodes,
                            ...this.props.codes.filter(code => code.code === e.target.value)]
                    }
                });
            }
        } else {
            if (typeof (e.target.value) === 'string') {
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.name]: e.target.value.trim()
                    }
                });
            } else {
                this.setState({
                    input: {
                        ...this.state.input,
                        [e.target.name]: e.target.value
                    }
                });
            }
        }

        this.setState({
            error: this.validateCampo({
                ...this.state.input,
                [e.target.name]: e.target.value
            })
        });
    }
    deleteCodeToUpdate = code => {
        let { id } = code.target
        this.setState({
            input: {
                ...this.state.input,
                codes: [
                    ...this.state.input.codes.filter(code => code !== id)
                ],
                completCodes: [
                    ...this.state.input.completCodes.filter(code => code.code !== id)
                ]
            }
        });
    }
    /**guardar nuevo Destino turistico */
    senNewTravel = (e) => {
        e.preventDefault();
        this.setState({ messages: [] })
        let toSend = [];
        let { name, dificultad, duracion, temporada, } = this.state.input;
        toSend = this.state.input.codes.map(selected => {
            return { name, dificultad: parseInt(dificultad), duracion, temporada, code: selected };
        })
        if (JSON.stringify(this.state.error) === '{}') {
            axios.post('/activities', toSend)
                .then(responces => {
                    this.setState({
                        messages: responces.data.map(responce => {
                            return { estado: responce.status, respuesta: responce.message }
                        })
                    });
                    setTimeout(() => {
                        this.props.history.push('/countries'); /**existe el useHystory en los hooks */
                    }, 1000);
                }, error => {
                    console.log(error);
                });
        }
    }
    render() {
        let { messages } = this.state;
        let { completCodes } = this.state.input
        let { agregado, alertaEstatus, botonEliminar, campo, contenido, datos, error, success, estados, formulario, input, newTravel, paises } = styles;
        return (
            <main className={newTravel}>
                <h2>Crear y/o agregar Nueva actividad turistica</h2>
                <section className={contenido}>
                    <article className={estados}>
                        {messages && messages.map((message, i) => (
                            <p
                                key={i}
                                className={`${alertaEstatus} ${message.estado === 'error' ? error : success}`}
                            >
                                {message.respuesta}
                            </p>
                        ))}
                    </article>
                    <article className="sectForm">
                        <form className={formulario} onSubmit={e => this.senNewTravel(e)}>
                            <h3>Coloca los datos de la nueva actividad</h3>
                            <div className={campo}>
                                <label htmlFor="name">Nombre:</label>
                                <div className={input}>
                                    <input type="text" name="name" id="name"
                                        placeholder="Nombre de la actividad"
                                        onChange={this.setChengeInput} />
                                    <p>{this.state.error.name}</p>
                                </div>
                            </div>
                            <div className={campo}>
                                <label htmlFor="dificultad">Dificultad:</label>
                                <div className={input}>
                                    <input type="number" name="dificultad" id="dificultad"
                                        min="1" max="5"
                                        placeholder="Del 1 al 5 que tan dificiel es"
                                        onChange={this.setChengeInput} />
                                    <p>{this.state.error.dificultad}</p>
                                </div>
                            </div>
                            <div className={campo}>
                                <label htmlFor="duracion">Duración:</label>
                                <div className={input}>
                                    <input type="text" name="duracion" id="duracion"
                                        placeholder="Cunto tiempo dura la actividad, horas, días o semanas?"
                                        onChange={this.setChengeInput} />
                                    <p>{this.state.error.duracion}</p>
                                </div>
                            </div>
                            <div className={campo}>
                                <label htmlFor="temporada">Temporada:</label>
                                <div className={input}>
                                    <select name="temporada" id="temporada" onChange={this.setChengeInput}>
                                        <option value="">--Selecciona la temporada---</option>
                                        <option value="Verano">Verano</option>
                                        <option value="Otoño">Otoño</option>
                                        <option value="Invierno">Invierno</option>
                                        <option value="Primavera">Primavera</option>
                                    </select>
                                    <p>{this.state.error.temporada}</p>
                                </div>
                            </div>
                            <div className={campo}>
                                <label htmlFor="code">Pais:</label>
                                <div className={input}>
                                    <select
                                        name="code"
                                        id="code"
                                        onChange={this.setChengeInput}
                                        onClick={this.setChengeInput}
                                    >
                                        <option value="">--Selecciona la temporada---</option>
                                        {this.props.codes && this.props.codes.map((code, i) => {
                                            return (
                                                <option key={i} value={code.code} >{code.name}</option>
                                            )
                                        })}
                                    </select>
                                    <p>{this.state.input.codes.length === 0 && this.state.error.code}</p>
                                </div>
                            </div>
                            <div className="botones" >
                                <input type="submit" onClick={this.setChengeInput} />
                            </div>
                        </form>
                    </article>
                    <article className={paises}>
                        {completCodes && completCodes.map((code, i) => (
                            <div key={i} className={agregado}>
                                <div className={datos}>
                                    <p> País: <span>{code.name}</span></p>
                                    <p> Codigo: <span>{code.code}</span></p>
                                </div>
                                <p
                                    id={code.code}
                                    className={botonEliminar}
                                    onClick={this.deleteCodeToUpdate}>
                                    Eliminar
                                </p>
                            </div>
                        ))}
                    </article>
                </section>
            </main >
        );
    }
}

const mapState = state => {
    return {
        loadedCountries: state.loadedCountries,
        codes: state.codes,
        loadedTravels: state.loadedTravels
    }
}

const mapDispatch = dispatch => {
    return {
        getCountries: () => dispatch(getCountries())
    }
}

export default connect(
    mapState,
    mapDispatch
)(NewTravel);