import React, { Component } from 'react';
import axioApi from './../axioConfig';
class Home extends Component {
	constructor(props){
		super(props);
		const redirectfrom = this.props.location.redirectfrom;
		if(redirectfrom=='login'){
			window.location.reload();
		}
	}
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