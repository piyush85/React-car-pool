import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Register';
import DriverSearch from './Driversearchpage';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
ReactDOM.render(

(
        <Router>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/register' component={Register}/>
                <Route path='/drivers' component={DriverSearch}/>

            </Switch>
        </Router>
), document.getElementById('root'));
