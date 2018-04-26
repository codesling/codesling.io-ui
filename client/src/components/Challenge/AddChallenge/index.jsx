import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

class AddChallenge extends Component {
  state = { 
    title: '',
    content: '',
    difficulty: null
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    const { title, content, difficulty } = this.state;
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      user_id: id,
      type: 0
    }
    const result = await axios.post('http://localhost:3396/api/challenges/addChallenge', body);
    this.props.history.push('/home');
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
        <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
        <div>
          <label>Title: </label>
          <Input className="title-input"
            className='title-input'
            name='title'
            type='title'
            placeholder={'Enter title'}
            onChange={this.handleChallengeInput}
            />
          <label>Difficulty: </label>
          <Input 
            name='difficulty'
            type='difficulty'
            placeholder={'Enter problem difficulty'}
            onChange={this.handleChallengeInput}
            /> <br/><br/><br/>
          <Input 
            name='content'
            type='content'
            placeholder={'Enter problem prompt'}
            onChange={this.handleChallengeInput}
            />
        </div>
        <div>
            <textarea className="test-case-input" name="txtDescEd" cols="60" rows="10" placeholder={'Enter test cases'}></textarea>
        </div>
        <div>
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </div>
        </form>
      </div>
    );
  }
}

export default AddChallenge;
