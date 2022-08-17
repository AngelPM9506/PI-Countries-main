import { Component } from "react";
import { connect } from "react-redux";
import { getCountries } from "../../store/actions";
import { Link } from "react-router-dom";
class Landing extends Component {
    constructor(props) {
        super(props);
        this.body = document.querySelector('#body');
    }
    componentDidMount() {
        if (this.body.classList.contains('count')) this.body.classList.remove('count');
        this.props.getCountries()
        this.body.classList.add('land');
    }
    componentWillUnmount() {
        this.body.classList.remove('land');
        this.body.classList.add('count');
    }
    render() {
        return (
            <main className="landing">
                <h1>PI ciudades</h1>
                <div className="botones">
                    <Link className="btn" to={'/countries'}>Ciudades</Link>
                </div>
            </main>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        getCountries: () => dispatch(getCountries())
    }
}

export default connect(
    null,
    mapDispatch
)(Landing);