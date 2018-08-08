import React, { Component } from 'react';
import axioApi from './../axioConfig';
import qs from 'qs';
import CreatableSelect from 'react-select/lib/Creatable';
import { connect } from 'react-redux';

import {
    getTags, savePost
} from './../redux/actions'

const mapStateToProps = state => {  
    return {
        tags: state.postreducer.tags  // redux_step4 If data is reached to store, the Component can select data from it and apply in view. Now retrieve from store
    }
}

let $this;
class CreatePost extends Component {
    constructor(props){
		super(props);
        //this.state = {title : '', description : '', tags : [], alltags : []} // Redux is stateless and we are no longer use state in redux
		$this = this; 
    }

    selectedTags = []
    author = ''
    
	componentDidMount(){

        this.props.getTags();

        setTimeout(function(){
			axioApi.get('auth/user').then((res) => { 
                $this.author = res.data.id
			}).catch((err) => {
                $this.props.history.push('/login'); 
            });
		}, 1500)
	}

    async submitPost(){
        const postdata = {
            title : $this.getTitle.value,
            description : $this.getMessage.value,
            tags : $this.selectedTags,
            author : $this.author
        }

        postdata.tags = postdata.tags.map(function(t){
            return t.label;
        })
        console.log(postdata);

        const result = await $this.props.savePost(postdata);
        console.log(result);
        if(result.post._id){
            $this.props.history.push('/post'); 
        }
    }

    tagsSelectChange = (selectedtag) => {
        $this.selectedTags = selectedtag
    }
    
  render() {
    return (
      	<div>
      		<hr/>
            <h1>Post Create</h1>
            
                <br/>
                <div className="form-group">
                    <label>Title</label>
                    <input  name="title" ref={(input)=>this.getTitle = input}  type="text" className="form-control" id="title" aria-describedby="title" placeholder="Enter Title" />						
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input  name="description" ref={(input)=>this.getMessage = input}  type="email" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description" />						
                </div>
                <div className="form-group">
                    <label>Tags</label>
                    {/* <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={$this.state.tags}
                        isMulti = {true}
                    /> */}
                    {/* <CreatableSelect
                    isMulti
                    onChange={this.handleChange}
                    options={$this.state.tags}
                    /> */}
                    <CreatableSelect
                        isClearable
                        onChange={this.tagsSelectChange}                        
                        //onInputChange={this.handleInputChange}
                        options={this.props.tags}
                        isMulti = {true}
                    />
                
                </div>
                        
                <button type="submit" onClick={this.submitPost} className="btn btn-primary">Submit</button>
				
      	
            <hr/>
      	</div>
    );
  }
}

export default connect(mapStateToProps, { getTags, savePost })(CreatePost);