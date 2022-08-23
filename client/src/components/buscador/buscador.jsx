import { Component } from "react";
import { connect } from "react-redux";
import { searchByName } from "../../store/actions";

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toSearch: ''
        }
    }
    inputSearch = (event) => {
        this.setState({ toSearch: event.target.value });
    }
    search = (event) => {
        event.preventDefault();
        this.props.searchByName(this.state.toSearch)
            .then( resp => {
                if (resp.status === 200) {
                    this.props.retunFirstPage()
                    this.props.changeMaximo();
                }else{
                    alert(resp.data.message)
                }
            });
    }
    render() {
        return (
            <form className="buscador" onSubmit={this.search}>
                <input type="text" name="search" id="buscar"
                    onChange={this.inputSearch}
                    placeholder="Busca un pais" />
                <input type="submit" value="Buscar" />
            </form>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        searchByName: name => dispatch(searchByName(name))
    }
}

export default connect(
    null,
    mapDispatch
)(Buscador);