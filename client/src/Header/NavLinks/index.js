import React, { Component } from 'react';
import Client from '../../Client';
import {Link} from 'react-router';

class NavLinks extends Component {
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
    let loggedOut = <div id='navigation-links'><Link to='/register'><div className='header-button'>Register</div></Link> <Link to='/login'><div className='header-button'>Login</div></Link></div>;
    return (
      <div className='row' id='header'>
          <Link to='/'><div className='header-button' id='home-button'>Home</div></Link> 
          {this.state.user ? <div id='navigation-links'><Link to={'/user/' + this.state.user.username}><div className='header-button'>{this.state.user.username}</div></Link> <Link onClick={this.logout}><div className='header-button'>Logout</div></Link></div> : loggedOut}
      </div>
    );
  }
}

export default NavLinks;