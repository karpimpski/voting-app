import React, {Component} from 'react';
import Client from '../Client';
import Link from 'react-router';
import Header from '../Header';

class NotFound extends Component {
	render() {
		return (
			<div>
				<Header />
				<p>404!!!</p>
			</div>
		)
	}
}

export default NotFound;