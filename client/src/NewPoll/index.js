import React, {Component} from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import {proxy} from '../../package.json';

class NewPoll extends Component {
	render() {
		return (
			<form action={proxy + 'api/newpoll'}>
				<input name='name' placeholder='name'/>
				<input name='option'/>
				<input name='option'/>
				<input name='option'/>
				<input type='submit'/>
			</form>
		)
	}
}

export default NewPoll;