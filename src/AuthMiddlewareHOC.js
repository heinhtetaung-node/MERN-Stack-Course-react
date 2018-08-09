import React, { Component } from 'react';
import axioApi from './axioConfig';

const AuthMiddlewareHOC = (PassedComponent) => {
    return class AuthMiddleware extends Component {
        constructor(props){
            super(props);
            this.state = {loginuser : ''}            
        }
        componentDidMount() {
            const redirectIfNotLogin = this.refs.child.redirectIfNotLogin;
            axioApi.get('auth/user').then((res) => { 
                this.setState({
                    loginuser : res.data.id
                })                
			}).catch((err) => {
                localStorage.removeItem('token');
                if(redirectIfNotLogin){
                    this.props.history.push('/login'); 
                }                                
            });
        }
        render() {
            return (
              <PassedComponent {...this.props} ref="child" loginuser={this.state.loginuser} />
            )
        }
    }
}

export default AuthMiddlewareHOC;