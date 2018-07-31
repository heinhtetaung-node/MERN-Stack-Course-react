import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './views/Home.js'; // this is our newly created component. we have two page, home and register
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
                  {/* Link is equal with a href	 */}
									<Link className="nav-link" to='/'>Home</Link> 
								</li>
								<li className="nav-item">
									<Link className="nav-link" to='/register'>Register</Link>
								</li>								
							</ul>    
						</div>
					</nav>
        </div>

        {/* child layout is  right here, it only change, master and footer not change */}
        <div className="container">
          {/* lets start route in right here */}
          <Switch>
            <Route exact path="/" component={Home} />  {/* this route reference to domain/  */}
            <Route path="/register" component={Register} /> {/* this route reference to domain/register  */}
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
