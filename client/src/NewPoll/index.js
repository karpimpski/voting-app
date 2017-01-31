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
			inputs.push(<div key={i} className='center'><input name='option' className='form-input' placeholder='Option' autoComplete='off'/><br/></div>)
		}
		return (
			<div>
				<Header />
				<form action='api/newpoll' method='POST'>
					<div className='center'>
						<input name='name' className='form-input' placeholder='name' autoComplete='off'/>
					</div>
					{inputs}
					<div className='center' style={{'marginTop': '20px'}}>
						<button onClick={this.addOption.bind(this)} className='form-input-button'>Add</button>
						<input type='submit' className='form-input-button'/>
					</div>
				</form>
			</div>
		)
	}
}

export default NewPoll;