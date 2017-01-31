import React, {Component} from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';

class NewPoll extends Component {
	constructor(props){
		super(props);
		this.state = {num: 3}
	}

	addOption(e){
		e.preventDefault();
		this.setState({num: this.state.num + 1})
	}

	componentDidMount(){
    Client.get('/api/currentuser', (res) => {
    	if(res.res == null){
    		alert('You need to be signed in!');
    		window.location = '/';
    	}
    });
  }
	
	render() {
		var inputs = [];
		for(var i = 0; i < this.state.num; i++){
			inputs.push(<div key={i}><input name='option' className='form-input'/><br/></div>)
		}
		return (
			<div>
				<Header />
				<form action='api/newpoll' method='POST'>
					<input name='name' placeholder='name'/>
					{inputs}
					<button onClick={this.addOption.bind(this)}>Add</button>
					<input type='submit'/>
				</form>

				<Link to='/'>Cancel</Link>
			</div>
		)
	}
}

export default NewPoll;