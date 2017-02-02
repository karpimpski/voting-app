import React, { Component } from 'react';
import Header from '../Header';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {passwordOne: '', passwordTwo: ''}
  }

  changeOne(event) {
    this.setState({passwordOne: event.target.value});
  }

  changeTwo(event){
    this.setState({passwordTwo: event.target.value});
  }

  submit(e){
    if(this.state.passwordOne !== this.state.passwordTwo){
      e.preventDefault();
      alert("The passwords need to match");
    }
  }

  render(){
    return (
    	<div id='register_form'>
    	<Header />
      <form action="/api/register" method="POST">
        <div className='center row'>
          <input type="text" name="username" className='login-input' placeholder='Username'/>
        </div>
        <div className='center row'>
          <input type="password" name="password" className='login-input' placeholder='Password' value={this.state.passwordOne} onChange={this.changeOne.bind(this)}/>
        </div>
        <div className='center row'>
          <input type="password" className='login-input' placeholder='Password again' value={this.state.passwordTwo} onChange={this.changeTwo.bind(this)}/>
        </div>
        <div className='center row'>
          <input type="submit" value="Register" id='submit-form' onClick={this.submit.bind(this)}/>
        </div>
    	</form>
    </div>
    )
  }
}

export default Register;