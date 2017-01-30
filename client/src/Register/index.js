import React, { Component } from 'react';
import Header from '../Header';

class Register extends Component {
  render(){
    return (
    	<div id='login_form'>
    	<Header />
      <form action="/api/register" method="POST">
        <div>
          <label>Username:</label>
          <input type="text" name="username"/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password"/>
        </div>
        <div>
          <input type="submit" value="Register"/>
        </div>
    	</form>
    </div>
    )
  }
}

export default Register;