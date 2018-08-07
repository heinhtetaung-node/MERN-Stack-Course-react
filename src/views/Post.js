import React, { Component } from 'react';
import axioApi from './../axioConfig';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import {
    getPosts
} from './../redux/actions'

const mapStateToProps = state => {  
    return {
        posts: state.postreducer.posts  // redux_step4 If data is reached to store, the Component can select data from it and apply in view. Now retrieve from store
    }
}

let $this;
class Post extends Component {
    constructor(props){
		super(props);
        $this = this; 
    }
    
	componentDidMount(){

        this.props.getPosts()  // redux_step1 go to 'Actions' 
        
    }
    
    tabRows(){
        if($this.props.posts instanceof Array){  // redux_step5 'Component'  can use as this.props.store.datas // something like this
			return $this.props.posts.map(function(object, i){
				return <Tr p={object} no={i+1} key={i} />;
			})
		}
    }


  render() {
    return (
      	<div>
      		<hr/>
            <h1>Post</h1>
            <Link className="nav-link" to='/create-post'><button className="btn btn-default">Create Post</button></Link> 
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>                    
                    </tr>
                </thead>
                <tbody>
                    {this.tabRows()}
                </tbody>
            </table>
            <hr/>
      	</div>
    );
  }
}

class Tr extends Component{
    constructor(props) {
        super(props);        
    }
  	render(){
		return(
			<tr>
                <td>{this.props.p.title}</td>
                <td>{this.props.p.description}</td>
            </tr>
		)
	}
}

export default connect(mapStateToProps, { getPosts })(Post);