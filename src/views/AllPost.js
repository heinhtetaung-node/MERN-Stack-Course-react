import React, { Component } from 'react';
import $ from 'jquery';
import axioApi from './../AxiosConfig';
import { Redirect } from 'react-router'


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
    async fetchData(){
    
        // qs is a plugin which change json to query string  // reference from this https://github.com/axios/axios/issues/1195
		axioApi.get(`posts`).then((res) => { 
			
			// react router redirect to page programatically reference from https://tylermcginnis.com/react-router-programmatically-navigate/
            //$this.props.history.push('/login')
            $this.setState({ data: res.data });
			console.log(res.data);	

		}).catch((err)=>console.log(err))
      }
      redirectToPost = () => {
        $this.setState({ rePost: 'true' });
        
      }
      tabRow(){
        if($this.state.data instanceof Array){
          return $this.state.data.map(function(object, i){
              console.log(i);
              return <TableRow obj={object} no={i+1} key={i}/>;
          })
        }
      }
  render() {
    if($this.state.rePost){
    return <Redirect to='/post'/>;
    }
    return (
      	<div>
					<br/>
      		        <h2>Listing</h2>					
					<br/>
                    <div className="col-lg-10"  style={{textAlign : 'right'}}>
                        <button className="btn btn-primary top" style={{ marginTop:'10px',marginBottom:'20px'}} onClick={$this.redirectToPost}>Add New Post</button>
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
        // const msg = confirm('Are you sure want to delete?');
        // if(msg == true){
            // let uri = config.baseurl+'Post/'+this.props.obj.id;
            // axios.delete(uri).then((response) => {
            // if(response.data.result==false){
            //     $this.setState({ formErrors: response.data.errors });
            //     return false;
            // }else{
            //     $this.fetchData();
            // }
            // }).catch(function (error) {
            //     if(error.response.status == 401){
            //        // signOut.signOut($this);
            //     }
            // });
       // }
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
                  <button onClick={() => this.props.editData(this.props.obj)} className="btn btn-primary">Edit</button>
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



