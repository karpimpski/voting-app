import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {user: {poll_names: []}}
	}

	componentDidMount(){
		Client.get(`/api/user/` + this.props.params.username, (res) => {
			this.setState({user: res.res});
			console.log(this.state.user);
		});
	}

  render(){
    return (
    	<div id='poll'>
    		<Header />
	    	<h1>{this.state.user.username}</h1>
	    	{this.state.user.poll_names.map( (poll, i) => {
	    		return (
	    			<div>
	    			<Link to={`/poll/${encodeURIComponent(poll)}`}>{poll}</Link><br/>
	    			</div>
	    		)
	    	})}
    	</div>
    );
  }
}

export default Profile;
