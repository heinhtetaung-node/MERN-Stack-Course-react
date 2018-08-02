import React, { Component } from 'react';
import $ from 'jquery';
import axioApi from './../AxiosConfig';
//import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { Link } from 'react-router-dom';
// const options = [
// 	{ value: 'chocolate', label: 'Chocolate' },
// 	{ value: 'strawberry', label: 'Strawberry' },
// 	{ value: 'vanilla', label: 'Vanilla' }
//   ];
let $this
class Post extends Component {
	constructor(props){
		super(props);
		this.state = {id :'',title: '', description: '', tags: [],selectedOption: null,tag: ''};        
		$this = this;
	}
	handleOnChange(e){
        $this.setState({
          [e.target.name]: e.target.value
        })
    }
	componentDidMount(){
		
		// console.log($this.props);
		// console.log($this.props.match);
		console.log($this.props.match.params.id);
		console.log(localStorage.getItem('author'));
        $this.fetchData($this.props.match.params.id);
    }
    fetchData(id){
    
        // qs is a plugin which change json to query string  // reference from this https://github.com/axios/axios/issues/1195
		axioApi.get(`tags`).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
            //$this.props.history.push('/login')
		   // $this.setState({ data: res.data });
		   var tags = [];
		   if(res.data instanceof Array){
			res.data.map(function(object, i){
				//selecttag.push(object.value);
				var tag = {value:object.title, label:object.title};
				//console.log(tag);
				tags.push(tag);
				
			})
			 }
			 $this.setState({ tags: tags });
			//console.log(res.data);	

		}).catch((err)=>console.log(err))
		axioApi.get(`post/`+id).then((res) => { 
			var post = res.data;
            $this.setState({id : post._id});
            $this.setState({title : post.title});
			$this.setState({description : post.description})

			var tags = [];
		   if(post.tags instanceof Array){
			post.tags.map(function(object, i){
				//selecttag.push(object.value);
				var tag = {value:object.title, label:object.title};
				//console.log(tag);
				tags.push(tag);
				
			})
			 }
			$this.setState({
				selectedOption : tags
			  })
			console.log(res.data);	

		}).catch((err)=>console.log(err))
      }
	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
		//this.setState({ tags : selectedOption.value});
		//tags.push(selectedOption.value);
		console.log(selectedOption);
		//console.log(`Option selected:`, selectedOption);
	  }

	saveRegister(e){
		e.preventDefault();				
	 var selecttag = [];
	 console.log($this.state.selectedOption);
	 if($this.state.selectedOption instanceof Array){
		$this.state.selectedOption.map(function(object, i){
			selecttag.push(object.value);
		})
	 }
		const post = {
            _id :$this.state.id,
			title: $this.state.title,
			description: $this.state.description,
			tags: selecttag,
			author: localStorage.getItem('author')
		}
		console.log(post);
		axioApi.post(`posttag`,post).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
			$this.props.history.push('/allPost');	
				

		}).catch((err)=>console.log(err))
			
	}

  render() {
	const { selectedOption } = this.state;
    return (
      	<div>
					<br/>
      		<h2>Post Update</h2>					
					<br/>
					<div className="form-group">
						<label>Title</label>
						<input onChange={this.handleOnChange} name="title" type="text" className="form-control" id="title" aria-describedby="title" placeholder="Enter Title" value={$this.state.title} />						
					</div>
					<div className="form-group">
						<label>Description</label>
						<input onChange={this.handleOnChange}  name="description" type="email" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description" value={$this.state.description} />						
					</div>
					<div className="form-group">
						<label>Tags</label>
						{/* <Select
							value={selectedOption}
							onChange={this.handleChange}
							options={$this.state.tags}
							isMulti = {true}
						/> */}
						<CreatableSelect
						isMulti
						onChange={this.handleChange}
						options={$this.state.tags}
						value={selectedOption}
					/>
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

