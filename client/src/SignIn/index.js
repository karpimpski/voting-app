import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';

class SignIn extends Component {
  render(){
    return (
      <form action="login" method="post">
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
    )
  }
}

export default SignIn;