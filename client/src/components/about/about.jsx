import { Component } from "react";
import styles from './about.module.css';
class About extends Component {
    constructor(props) {
        super(props);
        this.body = document.querySelector('#body');
    }
    componentDidMount() {
        if (!this.body.classList.contains('count')) this.body.classList.add('count');
    }
    render() {
        let { about, datos, resumen, contacto, repo, item, iconos } = styles;
        return (
            <main className={`contenedor ${about}`}>
                <h2>Acerca del proyecto y el desarrollador</h2>
                <section className={datos}>
                    <article className={resumen}>
                        <h3>Resumen</h3>
                        <p>
                            En la realización se dividió el back-end de lo que sería el front-end; se utilizó PostgreSQL la gestión de la base de datos en la cual se relacionaron dos tablas de forma N:N para establecer la relación entre los países y la actividad turística que desempeña cada uno.
                        </p>
                        <p>
                            Para la creación de la api se utilizó Express para hacer todos endPoints para interactuar con la base de datos, utilizando en este mismo Sequelize, realizando los modelos con este para facilitar la interacción del servidor de Express con la base de datos, modularizando en cuatro principales carpetas controles, funciones, sunciones y modelos, toda la información de los países se obtuvo de una segunda api <a href="https://restcountries.com/" target="_blank" rel="noreferrer">restcountries</a> realizando la consulta mediante axios, de donde se importan todos los datos de los países de que se muestran en esta sitio.
                        </p>
                        <p>
                            Para la creación de la parte de la interfaz con usuario se empleo React usando un módulo de clase para cada sección y pagina a renderizar, se utilizó Redux para mantener un estado actualizado a lo largo de todo el sitio y mandando a llamar cada acción en el momento requería.
                        </p>
                        <p>
                            El el depliegue de esta app se realizó gracias a las versiones gratuitas de <a href="https://vercel.com/" target="_blank" rel="noreferrer">Vercel</a> y <a href="https://www.heroku.com/platform" target="_blank" rel="noreferrer">Heroku</a>
                        </p>
                        <div className={repo}>
                            <a href="https://github.com/AngelPM9506/PI-Countries-main" target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <p> Para ver mas detalles visita el repositorio en gitHub:</p>
                        </div>
                    </article>
                    <article className={contacto}>
                        <div className={item}>
                            <p>Autor: </p>
                            <span>Mrto. Miguel Angel P.M</span>
                        </div>
                        <h4>Contacto:</h4>
                        <div className={iconos}>
                            <a href="https://github.com/AngelPM9506" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
                            <a href="https://www.linkedin.com/in/miguel-angel-parra-mondragon-1404a4120/"  target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg></a>
                        </div>
                    </article>
                </section>
            </main>
        );
    }
}

export default About;