import React, { Component } from 'react';
import axioApi from './../axioConfig';
class Home extends Component {
	componentDidMount(){
		setTimeout(function(){
			axioApi.get('auth/user').then((res) => { 
				console.log(res.data);
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