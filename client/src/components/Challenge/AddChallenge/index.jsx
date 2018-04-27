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
    difficulty: 2,
    testCase: '',
    validated: false,
   }
  
  componentDidMount() {
    // console.log('component state after mounting',this.state)
  }
  
  validateInputs(name, value) {
    let contentValidated = !!this.state.content.length;
    let testCaseValidated = !!(Array.isArray(this.state.testCase));
    try {
      if (name === 'content') {
        if (value.length > 0) {
          contentValidated = true;
        }
      } else if (name === 'testCase') {
        console.log('flag', JSON.parse(value)[0].arguments)
        if (Array.isArray(JSON.parse(value)) && typeof (((JSON.parse(value))[0]) !== undefined)) {
          testCaseValidated = true;
        }
      }
      if (contentValidated && testCaseValidated) {
        this.setState({ validated: true });
      } else {
        this.setState({ validated: false });
      }
    } catch (e) {
      this.setState({ validated: false });
    }
  }

  isValidated() {
    return this.state.validated;
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
    this.validateInputs(name, value);

    // this.setState({ [name]: value });
    // console.log('state inside event', this.state)
    
  }

  handleDifficultySelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ difficulty : parseInt(value) });
  }

  render() {
    console.log('current state: ', this.state)
    return (
      <div className="login-form-container">
        <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
        <div>
          <label>Title </label>
          <Input className="title-input"
            className='title-input'
            name='title'
            type='title'
            placeholder={''}
            onChange={this.handleChallengeInput}
          /><br/><br/>
          <label>Difficulty
          <select onChange={(e) => this.handleDifficultySelect(e)} defaultValue='2'>
            <option value='1'>Easy</option>
            <option value='2'>Medium</option>
            <option value='3'>Hard</option>
          </select>
          </label> <br/><br/>
          {/* <Input 
            name='content'
            type='content'
            placeholder={'Enter problem prompt'}
            onChange={this.handleChallengeInput}
            /> */}
        </div>
        <label>Challenge Description</label>
        <div>
            <textarea className="prompt-input" name="content" cols="60" rows="5" placeholder={'Enter challenge prompt'} onChange={this.handleChallengeInput}></textarea>
        </div> <br/>
        <label>Test Cases <br/> Please input test case in the following format: <br/> {'[ {arguments: FILL_ME_IN, expected: FILL_ME_IN} ]'}</label>
        <div>
            <textarea className="test-case-input" name="testCase" cols="60" rows="10" placeholder={'Enter test cases'} onChange={this.handleChallengeInput}></textarea>
        </div>
        { this.state.validated ? 
        (<div>
          <Button
            backgroundColor="blue"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
          />
        </div>) : 
          <Button
            error='true'
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
          /> }
        </form>
      </div>
    );
  }
}

export default AddChallenge;
