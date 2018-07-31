import React, { Component } from 'react';
import $ from 'jquery';
import qs from 'qs';
import axioApi from './../AxiosConfig';
let $this
class Register extends Component {
	constructor(props){
		super(props);
		this.state = {name: '', email: '', password: ''};        
		$this = this;
	}

	handleNameChange(e){
		$this.setState({
			name: e.target.value
		})
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
			name: $this.state.name,
			email: $this.state.email,
			password: $this.state.password
		}
		
		// qs is a plugin which change json to query string  // reference from this https://github.com/axios/axios/issues/1195
		axioApi.post(`user`,qs.stringify(user)).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
			$this.props.history.push('/login')		

		}).catch((err)=>console.log(err))
			
	}

  render() {
    return (
      	<div>
					<br/>
      		<h2>Register</h2>					
					<br/>
					<div className="form-group">
						<label>Name</label>
						<input onChange={this.handleNameChange} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter email" />						
					</div>
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

export default Register;

$(document).ready(function(){
	//checkMern();
});

function checkMern(){
	$.ajax({
		method: "POST",
		url: "http://mern-stack-course.herokuapp.com/api/user",
		dataType: "json",
		data: {
			"email": "hha@gmail.com",
		    "name": "hha",
		    "password": "hha"
		},
		success:function(data){
			console.log(data);
		}
	});
}

