import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';
import { TwitterButton, TwitterCount } from "react-social";
import {Chart} from 'react-google-charts';

class Poll extends Component {
	constructor(props){
		super(props);
		this.state = {poll: {options: [], author: null}, user: {username: null}}
	}

	componentDidMount(){
		Client.get(`/api/poll/${encodeURIComponent(this.props.params.name)}`, (res) => {
			this.setState({poll: res});
			Client.get('/api/currentuser', (r) => {
	      this.setState({user: r.res})
	    });
		});
	}

	vote(e){
		var option = e.target.innerHTML;
		
		Client.patch(`/api/addvote/`, {name: this.state.poll.name, option: option},  (res) => {
			if(res){
				this.setState({poll: res});
			}
			else{
				alert('You already voted!');
			}
		});
	}

	delete(){
		if(confirm('Are you sure?')){
			Client.del('/api/delete/', {name: this.state.poll.name}, function(res){
				if(res){
					window.location = '/';
				}
				else{
					alert("Sorry, you didn't create this poll.");
				}
			});
		}
	}

	add(){
		var option = prompt("Option");
		if(option !== '' && option !== null){
			Client.patch('/api/addoption/', {id: this.state.poll._id, option: option}, (res) => {
				this.setState({poll: res});
			});
		}
	}

  render(){
  	const creator = this.state.user && this.state.user.username === this.state.poll.author;
  	const loggedIn = this.state.user !== null;
  	let url='http://localhost:3000';
  	let text = `${this.state.poll.name} | Vote now at ${window.location.protocol}//${window.location.host}${window.location.pathname}`
  	const button = 
  	<TwitterButton url={text}>
      <TwitterCount url={url} />
      {" Share " + url}
    </TwitterButton>
    let data = [
    	['Option', 'Votes']
    ]
    this.state.poll.options.forEach((option) => data.push([option.name, option.votes]))
    console.log(data);
    return (

    	
    	<div id='poll'>
    		<Header />
	    	<h1>{this.state.poll.name}</h1>
	    	<h2><Link to={`/user/${this.state.poll.author}`}>{this.state.poll.author}</Link></h2>
	    	{this.state.poll.options.map( (option, i) => {
	    		return (
	    			<p id={`vote_${i}`}key={i}><span className='name' onClick={this.vote.bind(this)}>{option.name}</span> - {option.votes}</p>
	    		)
	    	})}
	    	<Chart
	        chartType="PieChart" 
	        data={data}
	        options={{}}
	        graph_id="chart"
	        width="100%"
	        height="400px"
	        legend_toggle
	       />
	    	<Link to='/'>Home</Link>
	    	{creator ? <Link onClick={this.delete.bind(this)}>Delete</Link> : null }
	    	{loggedIn ? button : null }
	    	{loggedIn ? <Link onClick={this.add.bind(this)}>Add Option</Link> : null}
    	</div>
    );
  }
}

export default Poll;
