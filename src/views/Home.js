import React, { Component } from 'react';
import axioApi from './../axioConfig';
import qs from 'qs';

import Select from 'react-select';
import { Link } from 'react-router-dom'

let $this;
class Home extends Component {
	constructor(props){
		super(props);
		const redirectfrom = this.props.location.redirectfrom;
		if(redirectfrom=='login'){
			window.location.reload();
		}
		$this = this;
		this.state = {posts:[], keyword:'', tags:[], alltags:[], page:1, limit:5}
	}
	componentDidMount(){		
		this.getPosts()
		this.getTags()
		document.addEventListener('scroll', this.trackScrolling);
		//document.getElementById('Loading').style.display = "none";
	}
	componentWillUnmount(){
		document.removeEventListener('scroll', this.trackScrolling);
	}
	trackScrolling(){
		const wrappedElement = document.getElementById('root');		
		if($this.isBottom(wrappedElement)){
			const nextpage = $this.state.page+1;
			$this.setState({
				page : nextpage
			});
			document.removeEventListener('scroll', $this.trackScrolling);
			document.getElementById('Loading').style.display = "block";
			setTimeout(function(){
				$this.getPosts();
			}, 500)
		}
	}
	isBottom(el){
		return el.getBoundingClientRect().bottom <= window.innerHeight;
	}
	getTags(){
		axioApi.get('tags').then((res) => {
				$this.setState({
						alltags : res.data
				})
		});
	}
	tagsSelectChange = (selectedtag) => {
			$this.setState({ tags : selectedtag, posts:[], page:1 });
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
			tags : selectTagsIds.toString(),
			page : $this.state.page,
			limit : $this.state.limit
		};						
		axioApi.get('posts?'+qs.stringify(filter)).then((res) => { 
			const postdatas = $this.state.posts.concat(res.data);
			$this.setState({
				posts : postdatas
			})
			document.getElementById('Loading').style.display = "none";
			setTimeout(function(){
				document.addEventListener('scroll', $this.trackScrolling);
			},1000)
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
			keyword : e.target.value, posts:[], page:1
		})
		setTimeout(function(){			
			$this.getPosts()
		}, 500)		
	}
  render() {
    return (
      	<div id="HomeView">
					<div className="row" >
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
									<div id="Loading">Loading...</div>					
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
		return this.props.post.tags.map(function(t, i){
			return <span key={i} className="badge badge-info">{t.title}</span>
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
							<Link to={"post-detail/"+this.props.post._id} >Read More &raquo; </Link>
							<br/><br/><br/>
					</div>
			</div>							
		)
	}
}