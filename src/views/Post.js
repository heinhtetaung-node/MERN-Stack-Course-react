import React, { Component } from 'react';
import axioApi from './../axioConfig';
import { Link } from 'react-router-dom'

let $this;
class Post extends Component {
    constructor(props){
		super(props);
        this.state = {'posts' : []}
		$this = this; 
    }
    redirectIfNotLogin = true;
	componentDidMount(){
        axioApi.get('posts').then((res) => {
            $this.setState({ 'posts' : res.data });
        });

        
		// setTimeout(function(){
		// 	axioApi.get('auth/user').then((res) => { 
		// 		console.log(res.data);
		// 	}).catch((err) => {
        //         $this.props.history.push('/login'); 
        //     });
		// }, 1500)
	}


  render() {
    return (
      	<div>
      		<hr/>
            <h1>Post {this.props.loginuser}</h1>
            <Link className="nav-link" to='/create-post'><button class="btn btn-default">Create Post</button></Link> 

            <hr/>
      	</div>
    );
  }
}
export default Post;