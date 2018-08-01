import React, { Component } from 'react';
import axioApi from './../AxiosConfig';

class Home extends Component {
	componentDidMount(){
		setTimeout(function(){
			axioApi.get('auth/user').then((res) => { 
				console.log(res.data);
			  localStorage.setItem('author', res.data.id);         
			});
		}, 1500)
	}
  render() {
    return (
      	<div>
      		<hr/>
					<h1>Home layout</h1>
					<hr/>
      	</div>
    );
  }
}

export default Home;
