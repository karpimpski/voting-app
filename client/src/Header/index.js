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

  logout(){
    Client.post('/api/logout');
    window.location = '/';
  }

  render(){
    var loggedOut = <div id='navigation-links'><Link to='/register'>Register</Link> <Link to='/login'>Login</Link></div>;
    return (
      <div id='header'>
        <Link to='/'>Home</Link> 
        {this.state.user ? <div id='navigation-links'><Link to={'/user/' + this.state.user.username}>{this.state.user.username}</Link> <Link onClick={this.logout}>Logout</Link></div> : loggedOut}
      </div>
    );
  }
}

export default Header;