import { Component } from "react";
import { Link } from "react-router-dom";

class ItemCountry extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { name, continente, image, code } = this.props;
        return (
            <article className="itemCountry">
                <Link to={`/countries/${code}`}>
                    <h3>{name}</h3>
                    <span>{continente}</span>
                </Link>
                <div className="bandera">
                    <picture>
                        <source srcSet={image[1]} />
                        <img src={image[0]} alt="Bandera" />
                    </picture>
                </div>
            </article>
        );
    }
}

export default ItemCountry;