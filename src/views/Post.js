import React, { Component } from 'react';
import axioApi from './../axioConfig';
import { Link } from 'react-router-dom'

let $this;
class Post extends Component {
    constructor(props){
		super(props);
        this.state = {'posts' : [], author : ''}
		$this = this; 
    }
    
	componentDidMount(){
        
    }    
    authSuccess(){
        $this.getDats();
    }
    getDats(){
        axioApi.get('posts?author='+$this.props.loginuser).then((res) => {
            $this.setState({ 'posts' : res.data });
        });
    }    
    deletePost(id){
        axioApi.post('removepost', {_id : id}).then((res) => {
            $this.getDats()
        });
    }
    tabRows(){
        return $this.state.posts.map(function(post, i){
            return <tr key={i}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{(post.author)? post.author.name : ''}</td> 
                    <td>
                        <Link to={"/editPost/"+post._id}><button>Edit</button></Link>                    
                        <button onClick={() => $this.deletePost(post._id)}>Delete</button></td>                   
                    </tr>;
        });
    }
  render() {
    return (
      	<div>
      		<hr/>
            <h1>Post</h1>
            <Link className="nav-link" to='/create-post'><button className="btn btn-default">Create Post</button></Link> 
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Author Name</th>
                        <th>Options</th>
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
export default Post;