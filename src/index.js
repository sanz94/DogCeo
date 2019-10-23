import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import App from './app';
import '../src/css/styles.css';
import {Router} from "react-router-dom/umd/react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const hist = createBrowserHistory();
ReactDOM.render(
    <Router history={hist}>
        <App/>
    </Router>,
    document.getElementById('root')
);
