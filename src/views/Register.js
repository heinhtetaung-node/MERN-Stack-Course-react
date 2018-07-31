import React, { Component } from 'react';
import asioApi from './../axioConfig';
import qs from 'qs';
let $this;
class Register extends Component {

	// this function is used for page setup work or If you want to start doing in page start do this
	constructor(props){
		super(props);

		// especially it used for state declaration
		this.state = {email:'', password:'', name:''}  // state is declaring data that used in this page. and it's connecting with view and if it is change, the view also reflect and also change. something like autobinding
		$this = this; // this is need because we cant find this in other function, need to record component this
	}

	handleNameChange(e){  // this function need to use in react, because if something change in view, need to set data to state
		$this.setState({
			name : e.target.value
		})
	}

	handleEmailChange(e){
		$this.setState({
			email : e.target.value
		})	
	}

	handlePasswordChange(e){
		$this.setState({
			password : e.target.value
		})	
	}

	handleSubmit(e){
		e.preventDefault(); // prevent to go page refresh

		const user = {email:$this.state.email, password:$this.state.password, name:$this.state.name}

		// send ajax with axio
		asioApi.post("user", qs.stringify(user)).then((res) => {
			// in this case, we cant use this, we can conflict with axio this. that's why use $this that we recorded. is just component this
			 
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/ 			
			
			// lets check network, all right
			$this.props.history.push('/login'); // code for redirect login

			// lets run
		});
	}

  render() {
    return (
			<div>
				<h2>Register</h2>
				<br/>
				<form onSubmit={this.handleSubmit}>
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
				<button type="submit"  className="btn btn-primary">Submit</button>	
				</form>
			</div>		
    );
  }
}
export default Register;