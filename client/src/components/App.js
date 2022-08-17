import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './home/home';
import Landing from './landing/landing ';
import NavBar from './navbar/navbar';
import Country from './country/country.jsx';
import newTravel from './newTravel/newTravel';

function App() {
  return (
    <Fragment>
    <Route exact path="/" component={Landing} />
      <Route path="/countries" component={NavBar} />
      <Route exact path="/countries" component={Home} />
      <Route exact path="/countries/:code" component={Country} />
      <Route exact path="/countries/nueva/actividad" component={newTravel} />
    </Fragment>
  );
}

export default App;