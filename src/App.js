import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './views/Home.js';
import Register from './views/Register.js';

class App extends Component {
  render() {
    return (
			
			<div>
				<div className="header">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto container">
								<li className="nav-item active">									
									<Link className="nav-link" to='/'>Home</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to='/register'>Register</Link>
								</li>								
							</ul>    
						</div>
					</nav>
				</div>

				<div className="container">
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/register' component={Register}/>
					</Switch>
				</div>

				<div className="container">
					<h6>Footer</h6>
				</div>
			</div>
			
    );
  }
}

export default App;
