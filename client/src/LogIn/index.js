import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';

class LogIn extends Component {
  render(){
    return (
    	<div id='register_form'>
    		<Header />
	      <form action="/api/login" method="POST">
	        <div>
	          <label>Username:</label>
	          <input type="text" name="username"/>
	        </div>
	        <div>
	          <label>Password:</label>
	          <input type="password" name="password"/>
	        </div>
	        <div>
	          <input type="submit" value="Log In"/>
	        </div>
	      </form>
      </div>
    )
  }
}

export default LogIn;