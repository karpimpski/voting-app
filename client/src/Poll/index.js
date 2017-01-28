import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';

class Poll extends Component {
	constructor(props){
		super(props);
		this.state = {poll: {options: []}}
	}

	componentDidMount(){
		Client.get(`/api/poll/${encodeURIComponent(this.props.params.name)}`, (res) => {
			this.setState({poll: res});
		})
	}

	vote(e){
		var option = e.target.innerHTML;
		Client.patch(`/api/addvote/`, {name: this.state.poll.name, option: option},  (res) => {
			this.setState({poll: res});
		});
	}

	delete(){
		Client.del('/api/delete/' + encodeURIComponent(this.state.poll.name), this.state.poll.name);
	}

	add(){
		var option = prompt("Option");
		Client.patch('/api/addoption/', {id: this.state.poll._id, option: option}, (res) => {
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
	    	<Link onClick={this.delete.bind(this)}>Delete</Link>
	    	<Link onClick={this.add.bind(this)}>Add</Link>
    	</div>
    );
  }
}

export default Poll;
