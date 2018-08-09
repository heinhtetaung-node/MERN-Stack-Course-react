import AuthMiddlewareHOC from './../AuthMiddlewareHOC';
import React, { Component } from 'react';

const RoleMiddlewareHOC = (PassedComponent) => {
    return class RoleMiddleware extends Component {
        componentDidMount() {
            console.log("abc2");
            alert("p2");
        }
        render() {
            return (
                <PassedComponent {...this.props} />
            )
        }
    }    
}

class HocTest extends Component {
    constructor(props){
        super(props);
        this.state = {redirectIfNotLogin : true}
    }
    redirectIfNotLogin = true;
	componentDidMount(){
        alert("HocTest")
    }
    render(){
        return(
            <div>HocTest {this.props.loginuser}</div>
        )
    }
}
export default (RoleMiddlewareHOC(AuthMiddlewareHOC(HocTest)));