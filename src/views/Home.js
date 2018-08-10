import React, { Component } from 'react';
import axioApi from './../axioConfig';
import qs from 'qs';

import Select from 'react-select';

let $this;
class Home extends Component {
	constructor(props){
		super(props);
		const redirectfrom = this.props.location.redirectfrom;
		if(redirectfrom=='login'){
			window.location.reload();
		}
		$this = this;
		this.state = {posts:[], keyword:'', tags:[], alltags:[]}
	}
	componentDidMount(){		
		setTimeout(function(){
			axioApi.get('auth/user').then((res) => { 
				console.log(res.data);
			});
		}, 1500)
		this.getPosts()
		this.getTags()
	}
	getTags(){
		axioApi.get('tags').then((res) => {
				$this.setState({
						alltags : res.data
				})
		});
	}
	tagsSelectChange = (selectedtag) => {
			$this.setState({ tags : selectedtag });
			setTimeout(function(){			
			$this.getPosts();
			},500);
	}
	getPosts(){
		const selectTagsIds=$this.state.tags.map(function(t){
			return t.value;
		});		
		const filter = {
			keyword : $this.state.keyword,
			tags : selectTagsIds.toString()
		};						
		axioApi.get('posts?'+qs.stringify(filter)).then((res) => { 
			$this.setState({
				posts : res.data
			})
		});
	}
	tabRows(){
		if($this.state.posts instanceof Array){
			return $this.state.posts.map(function(post, i){
				return <PostList post={post} key={i} />
			})		
		}
	}

	changeKeyword(e){		
		$this.setState({
			keyword : e.target.value
		})
		setTimeout(function(){			
			$this.getPosts()
		}, 500)		
	}
  render() {
    return (
      	<div>
					<div className="row">
							<div className="col-md-3">
									<br/>
									<input type="text" onBlur={this.changeKeyword} className="form-control" placeholder="Search..." />	
									<br/>		
							</div>
							<div className="col-md-6">
								<br/>
								<Select
										isClearable
										onChange={this.tagsSelectChange}
										//onInputChange={this.handleInputChange}
										options={this.state.alltags}
										isMulti = {true}
								/>
							</div>

							{/* <div className="col-md-3">
									<br/>
									<select className="custom-select" id="inputGroupSelect01">
											<option selected>Choose Author</option>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
									</select>
									<br/>		
							</div> */}
							
					</div>
					<div className="row">						
							<div className="col-md-12">
									<br/>
									{this.tabRows()}					
							</div>
					</div>
			</div>
    );
  }
}
export default Home;


class PostList extends Component{
	constructor(props){
		super(props)
	}
	showTags(){
		return this.props.post.tags.map(function(t){
			console.log(t);
			return <span className="badge badge-info">{t.title}</span>
		})
	}
	render(){
		return(
			<div className="row">
					<div className="col-md-12">
							<h4>{this.props.post.title}</h4>
							{this.showTags()}
							<br/>												
							<p className="text-justify">
							{this.props.post.description}
							</p>
							<a href="#">Read More &raquo; </a>
							<br/><br/><br/>
					</div>
			</div>							
		)
	}
}