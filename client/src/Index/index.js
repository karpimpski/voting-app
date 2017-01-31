import React, { Component } from 'react';
import Client from '../Client';
import {Link} from 'react-router';
import Header from '../Header';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {polls: [], user: null, currentPolls: [], pollIndex: 0};
  }

  componentDidMount(){
    Client.get('/api/polls', (res) => {
      this.setState({polls: res, currentPolls: res.slice(this.state.pollIndex, this.state.pollIndex + 4)});
      console.log(this.state.currentPolls);
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

  nextPage(){
    if(this.state.pollIndex < this.state.polls.length - 4){
      this.setState({
        currentPolls: this.state.polls.slice(this.state.pollIndex + 4, this.state.pollIndex + 8),
        pollIndex: this.state.pollIndex + 4
      });
    }
  }

  previousPage(){
    if(this.state.pollIndex > 0){
      this.setState({
        currentPolls: this.state.polls.slice(this.state.pollIndex - 4, this.state.pollIndex),
        pollIndex: this.state.pollIndex - 4
      });
    }
  }

  render(){
    return (
      <div id='polls'>
        <Header />
          <div id='poll-list'>
          {Object.keys(this.state.currentPolls).map((key, i) => {
            var poll = this.state.currentPolls[key]
            return (
              <div className='center row' key={i}>
                <Link to={`/poll/${encodeURIComponent(poll.name)}`}><div className='tall wide button'>{poll.name}</div></Link>
              </div>
            )
          })}
          <div className='center row'>
            {this.state.pollIndex > 0 ? <div className='tall thin button' onClick={this.previousPage.bind(this)}>Previous</div> : null}
            <Link to={`/newpoll`} onClick={this.checkVote.bind(this)}><div className='tall thin button'>New Poll</div></Link>
            {this.state.pollIndex < this.state.polls.length - 4 ? <div className='tall thin button' onClick={this.nextPage.bind(this)}>Next</div> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;