import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';

import axioApi from './axioConfig';

/*** Redux ***/
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './redux/store';
/*** *********** ***/

let token = localStorage.getItem('token');            
if(token){
	axioApi.defaults.headers.common['x-access-token'] = localStorage.getItem('token');           
	axioApi.get('auth/user').then((res) => { 
        localStorage.setItem('user_id', res.data.id);
	}).catch((err) => {
        localStorage.removeItem('token');        
    });   
}


ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <App />                
      </ConnectedRouter>
  </Provider>, document.getElementById('root')); 

registerServiceWorker();
