import React, { Component } from 'react';

class HocTest extends Component {
	constructor(props){
        super(props); 
        this.state= {loginuser : '121212'}       
    }
    componentDidMount(){
        alert("HocTest");
    }
    render(){
        return(
            <div>Main</div>
        )
    }
}

const AuthenticationHOC = (PassedComponent) => {
    return class Authentication extends Component{
        componentDidMount(){
            alert("Authentication");
            alert(this.refs.child.state.loginuser);
        }
        render(){
            return (
                <PassedComponent {...this.props} ref="child" />
            )
        }
    }
}


const AuthenticationRoleHOC = (PassedComponent) => {
    return class AuthenticationRole extends Component{
        componentDidMount(){
            alert("AuthenticationRole");            
        }
        render(){
            return (
                <PassedComponent {...this.props} ref="child" />
            )
        }
    }
}

export default (AuthenticationRoleHOC(AuthenticationHOC(HocTest)));
