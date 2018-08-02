import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './views/Home.js';
import Register from './views/Register.js';
import Login from './views/Login.js';
import Post from './views/Post.js';
import AllPost from './views/AllPost.js';
import EditPost from './views/EditPost.js';

class App extends Component {
  navMenu(){
    let navMenu = []
   // if("token" in localStorage){
     // navMenu.push(<li key="post" className="nav-item"><Link className="nav-link" to='/post'>Post</Link></li>);
      navMenu.push(<li key="Allpost" className="nav-item"><Link className="nav-link" to='/allPost'>All Post</Link></li>);
   // }
    // }else{
    //   navMenu.push(<li key="7"><Link to="signin">Sign In</Link></li>);
      
    // }
    return navMenu;
  }
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
                {this.navMenu()}

							</ul>    
						</div>
					</nav>
				</div>

				<div className="container">
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/register' component={Register}/>
						<Route path='/login' component={Login}/>
						<Route path='/post' component={Post}/>
						<Route path="/editPost/:id" component={EditPost} />
            <Route path='/allPost' component={AllPost}/>
					</Switch>
				</div>

				<div className="container">
					<br/>
					<hr/>
					<p className="lead">								
						MERN stack tutorial by @<a href="https://github.com/heinhtetaung-node/">HeinHtetAung</a> . Copyright@2018
					</p>
				</div>
			</div>
			
    );
  }
}

export default App;
