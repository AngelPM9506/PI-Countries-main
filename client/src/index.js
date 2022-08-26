/**repos */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

/**estilos universales */
//import './scss/variables.scss';
import './css/index.css';

/**componenetes */
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store from './store';

/**variables de entorno */
import dotenv from 'dotenv';
dotenv.config();

/**url default para axios */
axios.defaults.baseURL = process.env.REACT_APP_API || 'http://127.0.0.1:3001';

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
