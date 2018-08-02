import React, { Component } from 'react';
import $ from 'jquery';
import axioApi from './../AxiosConfig';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


let $this
class AllPost extends Component {
	constructor(props){
		super(props);
		this.state = {data: '',rePost: ''};        
		$this = this;
	}

    componentDidMount(){
        $this.fetchData();
    }
    fetchData(){
    
        // qs is a plugin which change json to query string  // reference from this https://github.com/axios/axios/issues/1195
		axioApi.get(`posts?author=`+localStorage.getItem('author')).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
            //$this.props.history.push('/login')
            $this.setState({ data: res.data });
			console.log(res.data);	

		}).catch((err)=>console.log(err))
      }
    //   redirectToPost = () => {
    //     $this.setState({ rePost: 'true' });
        
    //   }
      tabRow(){
        if($this.state.data instanceof Array){
          return $this.state.data.map(function(object, i){
              console.log(i);
              return <TableRow obj={object} no={i+1} key={i} editData={$this.editData}/>;
          })
        }
      }
      editData(id){
        alert(id);
        $this.setState({ rePost: 'true' });
      }
  render() {
    // if($this.state.rePost){
    // return <Redirect to='/post'/>;
    // }
    return (
      	<div>
					<br/>
      		        <h2>Listing</h2>					
					<br/>
                    <div className="col-lg-10"  style={{textAlign : 'right'}}>
                        <Link to={"/post"} class="btn btn-primary center-block" style={{ marginTop:'10px',marginBottom:'20px'}}>Add New Post</Link>
                        {/* <button className="btn btn-primary top" style={{ marginTop:'10px',marginBottom:'20px'}} onClick={$this.redirectToPost}>Add New Post</button> */}
                    </div>
                    <div className="row">
                    <div className="col-sm-10">
                        <table id="dataTable" className="table table-bordered table-condensed table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th></th>
                                    <th></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.tabRow()}
                            </tbody>                
                        </table>
                    </div>
                </div>
					
      	</div>
    );
  }
}
class TableRow extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
        this.DeleteSubmit = this.DeleteSubmit.bind(this);
    }
    DeleteSubmit(e){
        e.preventDefault();
        alert(this.props.obj._id);
        // const msg = $.confirm('Are you sure want to delete?');
        // if(msg == true){

            axioApi.delete(`postDelete/`+this.props.obj._id).then((res) => { 
			
                // react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
                $this.fetchData();	
                    
    
            }).catch((err)=>console.log(err))
       //}
    }
  render(){
      let btndelete;

      btndelete = <input type="submit" value="Delete" className="btn btn-danger"/>
      
      return (
          <tr>
              <td>
                  {this.props.no}
              </td>
              <td>
                  {this.props.obj.title}
              </td>
              <td>
                  {this.props.obj.description}
              </td>
              {/* <td>
                  {this.props.obj.tags}
              </td> */}
              <td>
                  {/* <Link to={"/editPost/"+this.props.obj._id}>React Router</Link>
              
                  <button onClick={() => this.props.editData(this.props.obj._id)} className="btn btn-primary">Edit</button> */}
                  <Link to={"/editPost/"+this.props.obj._id} class="btn btn-primary center-block">Edit</Link>
              </td>
              <td>
                <form onSubmit={this.DeleteSubmit}>
                    {btndelete}
                </form>
              </td>
          </tr>
      )
  }
}
export default AllPost;

$(document).ready(function(){
	//checkMern();
});



