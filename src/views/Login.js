import React, { Component } from 'react';
import $ from 'jquery';
import qs from 'qs';
import axioApi from './../AxiosConfig';
let $this
class Login extends Component {
	constructor(props){
		super(props);
		this.state = {email: '', password: ''};        
		$this = this;
	}

	handleEmailChange(e){
		$this.setState({
			email: e.target.value
		})
	}

	handlePasswordChange(e){
		$this.setState({
			password: e.target.value
		})
	}

	async saveRegister(e){
		e.preventDefault();				
			
		const user = {
			email: $this.state.email,
			password: $this.state.password
		}
		
		axioApi.post(`auth/login`,qs.stringify(user)).then((res) => { 
			localStorage.setItem('token', res.data.token);    
            axioApi.defaults.headers.common['x-access-token'] = localStorage.getItem('token');            
			$this.props.history.push('/')    

		}).catch((err)=>console.log(err))
			
	}

  render() {
    return (
      	<div>
					<br/>
      		<h2>Login</h2>					
					<br/>
					<div className="form-group">
						<label>Email address</label>
						<input onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />						
					</div>
					<div className="form-group">
						<label>Password</label>
						<input onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
					</div>					
					<button type="submit" onClick={this.saveRegister} className="btn btn-primary">Submit</button>
				
      	</div>
    );
  }
}

export default Login;

