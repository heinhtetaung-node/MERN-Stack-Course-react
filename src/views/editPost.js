import React, { Component } from 'react';
import axioApi from './../axioConfig';
import qs from 'qs';
import CreatableSelect from 'react-select/lib/Creatable';

let $this;
class EditPost extends Component {
    constructor(props){
		super(props);
        this.state = {_id: '', title : '', description : '', tags : [], alltags : [], author : ''}
		$this = this; 
    }
    
	componentDidMount(){
        $this.setState({
            _id : $this.props.match.params.id
        })
        axioApi.get('post/'+$this.props.match.params.id).then((res) => {
            const tags = res.data.tags.map(function(obj, i){
                return {value : obj._id, label: obj.title};
            });
            console.log(tags);
            $this.setState({
                title : res.data.title,
                description : res.data.description,
                tags: tags,
            })
        });

        axioApi.get('tags').then((res) => {
            $this.setState({
                alltags : res.data
            })
        });        
	}

    changeTitle(e){
        $this.setState({ title : e.target.value });
    }

    changeDescription(e){
        $this.setState({ description : e.target.value });
    }
    
    tagsSelectChange = (selectedtag) => {
        $this.setState({ tags : selectedtag });
    }

    savePost(){
        const postdata = {
            _id : $this.state._id,
            title : $this.state.title,
            description : $this.state.description,
            tags : $this.state.tags,
            author : $this.props.loginuser,
        }

        postdata.tags = postdata.tags.map(function(t){
            return t.label;
        })
        console.log(postdata);

        axioApi.post('posttag', postdata).then((res) => {
            $this.props.history.push('/post');
        });
    }
    
  render() {
    return (
      	<div>
      		<hr/>
            <h1>Post Edit</h1>
            
                <br/>
                <div className="form-group">
                    <label>Title</label>
                    <input value={$this.state.title} onChange={this.changeTitle} name="title" type="text" className="form-control" id="title" aria-describedby="title" placeholder="Enter Title" />						
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input value={$this.state.description} onChange={this.changeDescription}  name="description" type="email" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description" />						
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
                        options={this.state.alltags}
                        isMulti = {true}
                        value={this.state.tags}
                    />
                
                </div>
                        
                <button type="submit" onClick={this.savePost} className="btn btn-primary">Submit</button>
				
      	
            <hr/>
      	</div>
    );
  }
}
export default EditPost;