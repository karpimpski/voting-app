import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';

class Poll extends Component {
	constructor(props){
		super(props);
		this.state = {poll: {options: []}}
	}

	componentDidMount(){
		Client.search(`poll/${this.props.params.name}`, (res) => {
			this.setState({poll: res});
		})
	}

  render(){
    return (
    	<div id='poll'>
	    	<h1>{this.state.poll.name}</h1>
	    	{this.state.poll.options.map(function(option, i){
	    		return (
	    			<p key={i}>{option.name} - {option.votes}</p>
	    		)
	    	})}
	    	<Link to='/'>Home</Link>
    	</div>
    );
  }
}

export default Poll;
