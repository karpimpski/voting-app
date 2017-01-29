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
		Client.get(`/api/currentuser`, (res) => {
			console.log(res.res.poll_names);
			this.setState({user: res.res});
		});
	}

  render(){
    return (
    	<div id='poll'>
    		<Header />
	    	<h1>{this.state.user.username}</h1>
	    	{this.state.user.poll_names.map( (poll, i) => {
	    		return (
	    			<Link to={`/poll/${encodeURIComponent(poll)}`}>{poll}</Link>
	    		)
	    	})}
    	</div>
    );
  }
}

export default Profile;
