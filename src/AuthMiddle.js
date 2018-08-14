import React, { Component } from 'react';
import axioApi from './axioConfig';

let $this;
const AuthMiddlewareHOC = (PassedComponent) => {
    return class AuthMiddleware extends Component{
        constructor(props){
            super(props);
            $this = this;
            this.state = {loginuser : ''}
        }
        componentDidMount(){            
            axioApi.get('auth/user').then((res) => { 
                $this.setState({
                    loginuser : res.data.id
                })     
                if($this.refs.child.authSuccess){
                    $this.refs.child.authSuccess()          
                }                
			}).catch((err) => {
                $this.setState({
                    loginuser : 'noauth'
                })
                localStorage.removeItem('token');
                $this.props.history.push('/login'); 
            });          
        }
        showChild(){
            if($this.state.loginuser!=''){
                return <PassedComponent {...this.props} ref="child" loginuser={$this.state.loginuser} />
            }
        }
        render(){
            return (
                <div>{this.showChild()}</div>
            )
        }
    }
}

export default AuthMiddlewareHOC;