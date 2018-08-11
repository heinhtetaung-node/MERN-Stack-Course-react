import React, { Component } from 'react';
import axioApi from './../axioConfig';
import qs from 'qs';

import Select from 'react-select';

let $this;
class PostDetail extends Component {
	constructor(props){
		super(props);
        this.state = {post:[], author:""}
        $this = this;
    }
    getPostDetail(){
        axioApi.get('post/'+$this.props.match.params.id).then((res) => {
            $this.setState({
                post : res.data
            })
        });
    }
	componentDidMount(){		
		this.getPostDetail();

        axioApi.get('auth/user').then((res) => { 
            $this.setState({
                author : res.data.id
            });
        }).catch((err) => {
            
        });
	}
	showTags(){
        if($this.state.post.tags instanceof Array){
            return $this.state.post.tags.map(function(t, i){
                console.log(t);
                return <span key={i} className="badge badge-info">{t.title}</span>
            })
        }
    }
    showComments(){
        if($this.state.post.comments instanceof Array){
            const comments = $this.state.post.comments.reverse();
            return comments.map(function(c, i){
                return  <div className="col-md-12" key={i}>
                            <br/>
                            <h5>{c.author.name}</h5>
                            <p>{c.text}</p>
                        </div>
            })
        }        
    }
    saveComments(){
        const message = document.getElementById("comment").value;
        axioApi.post('savecomment', {id: $this.state.post._id, author:$this.state.author, text : message}).then((res) => {
            document.getElementById("comment").value = "";
            $this.getPostDetail();
        });
    }
    showCommentBox(){
        if($this.state.author!=""){
            return <div>
                    <textarea id="comment" placeHolder="Say Something" className="form-control"></textarea>
                    <button onClick={$this.saveComments} className="btn">Save</button>
                   </div>
        }        
    }
  render() {
    return (
      	<div>
            <div className="row">
                <div className="col-md-12">
                    <h2>{$this.state.post.title}</h2>
                    {this.showTags()}
                    <br/>
                    <p>{$this.state.post.description}</p>
                    {this.showCommentBox()}
                </div>
            </div>
            <div className="row">
                {this.showComments()}
            </div>
        </div>
    );
  }
}
export default PostDetail;

