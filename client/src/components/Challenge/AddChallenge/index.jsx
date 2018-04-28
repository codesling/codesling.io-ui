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

  validateInputs(name, value) {
    let contentValidated = !!this.state.content.length;
    let testCaseValidated = !!(Array.isArray(this.state.testCase));
    try {
      if (name === 'content') {
        if (value.length > 0) {
          contentValidated = true;
        }
      } else if (name === 'testCase') {
        
        if (value.includes('function')) {
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
    post(`http://localhost:3396/api/testCases/${result.data[0].id}`);
    this.props.history.push('/home');
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.validateInputs(name, value);
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
          <label>Title </label><br/>
          <Input className="title-input"
            className='title-input'
            name='title'
            type='title'
            placeholder={''}
            onChange={this.handleChallengeInput}
          /><br/><br/>
          <label>Difficulty<br/>
          <select onChange={(e) => this.handleDifficultySelect(e)} defaultValue='2'>
            <option value='1'>Easy</option>
            <option value='2'>Medium</option>
            <option value='3'>Hard</option>
          </select>
          </label> <br/><br/>
        </div>
        <label>Description</label>
        <div>
            <textarea className="prompt-input" name="content" cols="80" rows="5" placeholder={'Enter challenge prompt'} onChange={this.handleChallengeInput}></textarea>
        </div> <br/>
        <label>Test Cases <br/> &nbsp;&nbsp;Please enter each test case as shown in the sample below:</label>
        <div>
            <textarea className="test-case-input" name="testCase" cols="80" rows="15" onChange={this.handleChallengeInput}>{'function tests () {\n  var expected = 1;\n  var actual = func(1);\n  if (expected === actual) {\n    console.log("solved");\n    return actual;\n  } else {\n    console.log("expected " + expected + ", but got " + actual);\n  }\n}\n\ntests();'}</textarea>
        </div>
        { this.state.validated ? 
        (<div>
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
          />
        </div>) : 
          <Button
            error='true'
            backgroundColor="black"
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
