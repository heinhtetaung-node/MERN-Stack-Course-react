import React, { Component } from 'react';
import $ from 'jquery';
//import qs from 'qs';
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
		this.state = {title: '', description: '', tags: [],selectedOption: null,tag: ''};        
		$this = this;
	}
	handleOnChange(e){
        $this.setState({
          [e.target.name]: e.target.value
        })
    }
	componentDidMount(){
		console.log(localStorage.getItem('author'));
        $this.fetchData();
    }
    fetchData(){
    
        // qs is a plugin which change json to query string  // reference from this https://github.com/axios/axios/issues/1195
		axioApi.get(`tags`).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
            //$this.props.history.push('/login')
		   	// $this.setState({ data: res.data });
		   	var tags = res.data;
		   
			$this.setState({ tags: tags });
			//console.log(res.data);	

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
			selecttag.push(object.label);
		})
	 }
		const post = {
			title: $this.state.title,
			description: $this.state.description,
			tags: selecttag,
			author: localStorage.getItem('author')
		}
		
		axioApi.post(`posttag`,post).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
			$this.props.history.push('/allPost');	
				

		}).catch((err)=>console.log(err))
			
	}
	addTag(e){
		e.preventDefault();	
		const tag = {
			title: $this.state.tag
		}
		
		axioApi.post(`addTag`,tag).then((res) => { 
			
			$this.setState({ tag:'' });
			$this.fetchData();	
				

		}).catch((err)=>console.log(err))

	}

  render() {
	const { selectedOption } = this.state;
    return (
      	<div>
					<br/>
      		<h2>Register</h2>					
					<br/>
					<div className="form-group">
						<label>Title</label>
						<input onChange={this.handleOnChange} name="title" type="text" className="form-control" id="title" aria-describedby="title" placeholder="Enter Title" />						
					</div>
					<div className="form-group">
						<label>Description</label>
						<input onChange={this.handleOnChange}  name="description" type="email" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description" />						
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

