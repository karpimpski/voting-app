import React, {Component} from 'react';
import Client from '../Client';
import {Link} from 'react-router';
var pjson = require('../../package.json');

class NewPoll extends Component {
	render() {
		return (
			<form action={pjson.proxy + 'api/newpoll'}>
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