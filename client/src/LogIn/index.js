import React, { Component } from 'react';
import Header from '../Header';
import './index.css';

class LogIn extends Component {
  render(){
    return (
    	<div id='register_form'>
    		<Header />
	      <form action="/api/login" method="POST">
	        <div className='center row'>
	          <input type="text" name="username" id='username' className='login-input' placeholder='Username'/>
	        </div>
	        <div className='center row'>
	          <input type="password" name="password" id='password' className='login-input' placeholder='Password'/>
	        </div>
	        <div className='center row'>
	          <input type="submit" value="Log In" id='submit-form'/>
	        </div>
	      </form>
      </div>
    )
  }
}

export default LogIn;