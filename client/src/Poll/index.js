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

	vote(e){
		var option = encodeURIComponent(e.target.innerHTML);
		Client.search(`addvote/${this.state.poll.name}/${option}`, (res) => {
			this.setState({poll: res});
		});
	}

  render(){
    return (
    	<div id='poll'>
	    	<h1>{this.state.poll.name}</h1>
	    	{this.state.poll.options.map( (option, i) => {
	    		return (
	    			<p id={`vote_${i}`}key={i}><span className='name' onClick={this.vote.bind(this)}>{option.name}</span> - {option.votes}</p>
	    		)
	    	})}
	    	<Link to='/'>Home</Link>
    	</div>
    );
  }
}

export default Poll;
