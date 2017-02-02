import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';
import './index.css';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {user: {poll_names: []}}
	}

	componentDidMount(){
		Client.get(`/api/user/` + this.props.params.username, (res) => {
			this.setState({user: res.res});
		});
	}

  render(){
    return (
    	<div id='profile'>
    		<Header />
    		<div className='center row'>
	    		<h1>{this.state.user.username}</h1>
	    	</div>
	    	{this.state.user.poll_names.map( (poll, i) => {
	    		return (
	    			<div className='user-poll' key={i}>
	    				<div className='center row'>
	    					<Link to={`/poll/${encodeURIComponent(poll)}`}><div className='wide tall button user-poll-button'>{poll}</div></Link><br/>
	    				</div>
	    			</div>
	    		)
	    	})}
    	</div>
    );
  }
}

export default Profile;
