import React, { Component } from 'react';
import axioApi from './../AxiosConfig';
import qs from 'qs';
import { Link } from 'react-router-dom';
import Select from 'react-select';

let $this
class Home extends Component {
	constructor(props){
		super(props);
		this.state = {posts: [], page : 1, limit : 4, postLatest : [], keyword: '', 
		tags:[], tagsSelected : []};        
		$this = this;
	}

	componentDidMount(){
		setTimeout(function(){
			axioApi.get('auth/user').then((res) => { 
				console.log(res.data);
			  localStorage.setItem('author', res.data.id);         
			});
		}, 1500)
		this.getPosts();	
		this.getTags();	
		document.addEventListener('scroll', this.trackScrolling);	
	}

	getTags(){
		axioApi.get(`tags`).then((res) => { 						
			$this.setState({ tags: res.data });			
		}).catch((err)=>console.log(err))
	}

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    // track scroll reach to end
    trackScrolling = () => {
		if(this.state.postLatest.length==0){
			return false;
		}
        const wrappedElement = document.getElementById('HomeView');  // HomeView is our main div
        if (this.isBottom(wrappedElement)) {
			//alert("bottom reached");
			var nextpage = $this.state.page;
			nextpage++;				
			$this.setState({
				page : nextpage
			})
			document.getElementById("Loading").style.display = "block";
			document.removeEventListener('scroll', this.trackScrolling);
			setTimeout(function(){
				$this.getPosts();
			}, 1000);			
        }
	};
	
    // function for check reach bottom
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
	}
	
	getPosts(){		
		const filtertags = $this.state.tagsSelected.map(function(object, i){
			return object.value;
		})
		const filtertagsstr = filtertags.toString();
		const filter = {
			page : $this.state.page,
			limit : $this.state.limit,
			keyword : $this.state.keyword,
			tags : filtertagsstr,
			//
		}		
		axioApi.get('posts?'+qs.stringify(filter)).then((res) => { 	
			const postdatas = $this.state.posts.concat(res.data);				
			$this.setState({ posts: postdatas, postLatest : res.data });				
			document.getElementById("Loading").style.display = "none";
			document.addEventListener('scroll', this.trackScrolling);									
		}).catch((err) => {
			alert("abc");
		});		
	}
	showData(){
		if($this.state.posts instanceof Array){
			return $this.state.posts.map(function(object, i){
				return <Post obj={object} no={i+1} key={i} />;
			})
		}		
	}
	handleKeywordChange(e){
		$this.setState({
			keyword : e.target.value,
			page : 1,
			posts : []			
		})
		document.getElementById("Loading").style.display = "block";
		setTimeout(function(){
			$this.getPosts();
		}, 500)
	}
	handleTechnologyChange(selectedOption){
		$this.setState({
			tagsSelected : selectedOption,
			page : 1,
			posts : []			
		})
		document.getElementById("Loading").style.display = "block";
		setTimeout(function(){
			$this.getPosts();
		}, 500)
	}
  	render() {
		return (
			<div id="HomeView">
				<div className="row">
					<div className="col-md-3">
						<br/>
						<input type="text" onBlur={this.handleKeywordChange} className="form-control" placeholder="Search..." />	
						<br/>		
					</div>
					<div className="col-md-6">
						<br/>
						{/* <select class="custom-select" id="inputGroupSelect01">
							<option selected>Choose Technology</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select> */}
						<Select
						isMulti
						onChange={this.handleTechnologyChange}
						options={$this.state.tags} />
						<br/>		
					</div>					
				</div>
				<div className="row">						
					<div className="col-md-12">
						<br/>
						{this.showData()}																		
					</div>
				</div>
				<div id="Loading">
					<center>Loading ....</center>
				</div>
			</div>
		);
  	}
}


class Post extends Component{
    constructor(props) {
        super(props);        
    }
  	render(){
		return(
			<div className="row">
				<div className="col-md-12">
					<h4>{this.props.obj.title}</h4>
					<p className="text-justify">
						{this.props.obj.description}
					</p>				
					<Link to={"/detailPost/"+this.props.obj._id}>Read More &raquo;</Link>
					<br/><br/><br/>
				</div>
			</div>
		)
	}
}

export default Home;
