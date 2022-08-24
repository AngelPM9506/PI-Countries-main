import { Component } from "react";
import { Link } from "react-router-dom";
import styles from './itemCountry.module.css';

class ItemCountry extends Component {
    render() {
        let { name, continente, image, code } = this.props;
        let{bandera, containerItem, itemCountry} = styles;
        return (
            <article className={containerItem}>
                <div className={itemCountry}>
                    <Link to={`/countries/${code}/${continente}`}>
                        <h3>{name}</h3>
                        <div className={bandera}>
                            <picture>
                                <source srcSet={image[1]} />
                                <img src={image[0]} alt="Bandera" />
                            </picture>
                        </div>
                        <span>{continente}</span>
                    </Link>
                </div>
            </article>
        );
    }
}

export default ItemCountry;