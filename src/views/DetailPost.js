import React, { Component } from 'react';
import $ from 'jquery';
import axioApi from './../AxiosConfig';
import { Link } from 'react-router-dom';
let $this
class Post extends Component {
	constructor(props){
		super(props);
		this.state = {id :'',title: '', description: '', tags:'',comment:'',comments:''};        
		$this = this;
	}
	handleOnChange(e){
        $this.setState({
          [e.target.name]: e.target.value
        })
    }
	componentDidMount(){
		
        $this.fetchData($this.props.match.params.id);
    }
    fetchData(id){
    
		axioApi.get(`post/`+id).then((res) => { 
			var post = res.data;
            $this.setState({id : post._id});
            $this.setState({title : post.title});
			$this.setState({description : post.description})

			var tagsFromDB = [];
		   if(post.tags instanceof Array){
			post.tags.map(function(object, i){
				tagsFromDB.push(object.title);
			})
			}
			var commentFromDB = [];
			if(post.comments instanceof Array){
				post.comments.map(function(object, i){
					commentFromDB.push({name :object.author.name,text:object.text});
				})
				}
			console.log("commentFromDB");
			console.log(commentFromDB);
			$this.setState({
				tags : tagsFromDB,
				comments:commentFromDB
			  })
				

		}).catch((err)=>console.log(err))
      }
	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	  }

	saveRegister(e){
		e.preventDefault();				
		
		const post = {
            id :$this.state.id,
			author_id:localStorage.getItem('author'),
			comment:$this.state.comment
		}
		console.log(post);
		axioApi.post(`addComment`,post).then((res) => { 
			
			$this.setState({comment: ''});
			$this.fetchData($this.props.match.params.id);	

		}).catch((err)=>console.log(err))
			
	}
	displayTag(){
		let table = []
		if($this.state.tags instanceof Array){
			
			$this.state.tags.map(function(tag, key){
			
			table.push(<li key={key}>{tag} </li>);
			
			})
		}
	return table;
	 }
	 displayComments(){
		let table = []
		if($this.state.comments instanceof Array){
			
			$this.state.comments.map(function(comment, key){
				table.push(<div style={{paddingLeft: '20px',paddingRight: '20px'}}> <h4> {comment.name} </h4> <p> {comment.text}</p><hr/></div>);
			})
		}
	return table;
 	}
  render() {
	const { selectedOption } = this.state;
    return (
      	<div>
			<br/>
      		<h2>{$this.state.title}</h2>					
					<br/>
					<div>
					<ul>
						{this.displayTag()}
					</ul>
					</div>
					<div className="form-group">
						<p>{$this.state.description} </p>				
					</div>
					<div style={{display: 'block',backgroundColor: 'lavender'}}>
					
						{this.displayComments()}
					
					</div>	
					<div className="form-group">
						<textarea onChange={this.handleOnChange} name="comment" form="usrform" className="form-control" placeholder="Enter Comment here..." value={$this.state.comment}></textarea>
						{/* <input onChange={this.handleOnChange}  name="description" type="textarea" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description" value={$this.state.Comments} /> */}
					</div>
					
					<div className="col-lg-2">
						<button type="submit" onClick={this.saveRegister} className="btn btn-primary center-block" style={{float:'left'}}>Submit</button>
					
						<Link to={"/allPost"} class="btn btn-primary center-block" style={{float:'right'}}>back</Link>
					</div>
      	</div>
    );
  }
}

export default Post;

$(document).ready(function(){
	//checkMern();
});

