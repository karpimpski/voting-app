import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  componentDidMount(){
    Client.get('/api/currentuser', (res) => {
      this.setState({user: res.res})
    });
  }
  render(){
  	if(this.props.user){
  		var header = <div id='navigation-links'><Link to='/profile'>{this.state.user.username}</Link></div>;
  	}
  	else{
  		header = <div id='navigation-links'><Link to='/register'>Register</Link> <Link to='/login'>Login</Link></div>
  	}
    return (
      <div id='header'>
        <Link to='/'>Home</Link> 
        {header}
      </div>
    );
  }
}

export default Header;