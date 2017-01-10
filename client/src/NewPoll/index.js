import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Client from '../Client';
import {Link} from 'react-router';
import {proxy} from '../../package.json';

class NewPoll extends Component {
	constructor(props){
		super(props);
		this.state = {num: 3}
	}

	addOption(e){
		e.preventDefault();
		this.setState({num: this.state.num + 1})
	}

	render() {
		var inputs = [];
		for(var i = 0; i < this.state.num; i++){
			inputs.push(<div key={i}><input name='option'/><br/></div>)
		}
		return (
			<form action={proxy + 'api/newpoll'}>
				<input name='name' placeholder='name'/>
				{inputs}
				<button onClick={this.addOption.bind(this)}>Add</button>
				<input type='submit'/>
			</form>
		)
	}
}

export default NewPoll;