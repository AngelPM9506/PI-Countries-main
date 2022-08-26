import styles from "./loading.module.css";
import { Component, Fragment } from "react";

class Loading extends Component {
    render() {
        console.log(styles);
        let { loaderContainer , ring } = styles
        return (
            <div className={loaderContainer}>
                <div class={ring}>Cargando...
                    <span></span>
                </div>
            </div>
        );
    }
}

export default Loading;