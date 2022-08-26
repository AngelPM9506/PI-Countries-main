import styles from "./loading.module.css";
import { Component } from "react";

class Loading extends Component {
    render() {
        let { loaderContainer , ring } = styles
        return (
            <div className={loaderContainer}>
                <div className={ring}>Cargando...
                    <span></span>
                </div>
            </div>
        );
    }
}

export default Loading;