import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {polls: {}, user: null};
  }

  componentDidMount(){
    Client.get('/api/polls', (res) => {
      this.setState({polls: res});
    });
    Client.get('/api/currentuser', (res) => {
      this.setState({user: res.res})
    });
  }

  checkVote(e){
    if(!this.state.user){
      e.preventDefault();
      alert('You need to be signed in!');
    }
  }

  render(){
    return (
      <div id='polls'>
      <Header />
      {Object.keys(this.state.polls).map((key, i) => {
        var poll = this.state.polls[key]
        return (
          <div className='center row' key={i}>
            <Link to={`/poll/${encodeURIComponent(poll.name)}`}><div className='tall wide button'>{poll.name}</div></Link>
          </div>
        )
      })}
      <div className='center row'>
        <Link to={`/newpoll`} onClick={this.checkVote.bind(this)}><div className='tall wide button'>New Poll</div></Link>
      </div>
      </div>
    );
  }
}

export default Index;