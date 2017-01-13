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
		var option = encodeURIComponent(e.target.innerHTML);
		Client.patch(`/api/addvote/`, {name: this.state.poll.name, option: option},  (res) => {
			this.setState({poll: res});
		});
	}

	delete(){
		Client.get('/api/delete/' + encodeURIComponent(this.state.poll.name));
		window.location='/';
	}

	add(){
		alert(this.state.poll._id);
		var option = prompt("Option");
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
