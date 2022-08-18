import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { getCountries } from "../../store/actions";

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
                code: ''
            },
            error: {},
            message: { estado: '', respuesta: '' }
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
        let valCode = this.props.codes.map(code => code.code);
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
        if (!valCode.includes(input.code)) {
            error.code = 'Solo se aceptan datos precargados';
        }
        return error;
    }
    /**Verificar que nose tengan errores */
    setChengeInput = (e) => {
        this.setState({
            error: this.validateCampo({
                ...this.state.input,
                [e.target.name]: e.target.value
            })
        });
        this.setState({
            input: {
                ...this.state.input,
                [e.target.name]: e.target.value
            }
        });
    }
    /**guardar nuevo Destino turistico */
    senNewTravel = (e) => {
        e.preventDefault();
        if (JSON.stringify(this.state.error) === '{}') {
            let toSend = this.state.input;
            toSend.dificultad = parseInt(toSend.dificultad);
            axios.post('http://192.168.0.10:3001/activities', toSend)
                .then((responce, error) => {
                    if (responce.status === 201) {
                        this.setState({ message: { estado: 'success', respuesta: responce.data.name ? responce.data.name : this.state.input.name } });
                    } else if (responce.status === 202) {
                        this.setState({ message: { estado: 'error', respuesta: responce.data.message } });
                    } else {
                        this.setState({ message: { estado: 'error', respuesta: 'Algo salio mal intenta de nuevo' } });
                    }
                });
        }
    }
    render() {
        let { estado, respuesta } = this.state.message;
        return (
            <main className="contenedor newTravel">
                <h2>Crear y/o agregar Nueva actividad turistica</h2>
                <p className={`alertaEstatus ${estado}`}>{estado === 'success' ? `Exito al crear: ${respuesta}` : respuesta}</p>
                <form className="formulario" onSubmit={e => this.senNewTravel(e)}>
                    <h3>Coloca los datos de la nueva actividad</h3>
                    <div className="campo">
                        <label htmlFor="name">Nombre:</label>
                        <div className="input">
                            <input type="text" name="name" id="name"
                                placeholder="Nombre de la actividad"
                                onChange={this.setChengeInput} />
                            <p>{this.state.error.name}</p>
                        </div>
                    </div>
                    <div className="campo">
                        <label htmlFor="dificultad">Dificultad:</label>
                        <div className="input">
                            <input type="number" name="dificultad" id="dificultad"
                                min="1" max="5"
                                placeholder="Del 1 al 5 que tan dificiel es"
                                onChange={this.setChengeInput} />
                            <p>{this.state.error.dificultad}</p>
                        </div>
                    </div>
                    <div className="campo">
                        <label htmlFor="duracion">Duración:</label>
                        <div className="input">
                            <input type="text" name="duracion" id="duracion"
                                placeholder="Cunto tiempo dura la actividad, horas, días o semanas?"
                                onChange={this.setChengeInput} />
                            <p>{this.state.error.duracion}</p>
                        </div>
                    </div>
                    <div className="campo">
                        <label htmlFor="temporada">Temporada:</label>
                        <div className="input">
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
                    <div className="campo">
                        <label htmlFor="code">Pais:</label>
                        <div className="input">
                            <select name="code" id="code" onChange={this.setChengeInput}>
                                <option value="">--Selecciona la temporada---</option>
                                {this.props.codes && this.props.codes.map((code, i) => {
                                    return (
                                        <option key={i} value={code.code} >{code.name}</option>
                                    )
                                })}
                            </select>
                            <p>{this.state.error.code}</p>
                        </div>
                    </div>
                    <div className="botones" >
                        <input type="submit" onClick={this.setChengeInput} />
                    </div>
                </form>
            </main >
        );
    }
}

const mapState = state => {
    return {
        loadedCountries: state.loadedCountries,
        codes: state.codes
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