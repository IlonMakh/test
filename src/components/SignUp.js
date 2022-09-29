import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';
import userState from '../data/userState';
import ValidationData from '../data/ValidationData.json';

function SignUp(props) {
  const [phoneCheck, setPhoneCheck] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [password2Check, setPassword2Check] = useState('');
  const setRequiredStatus = name => ValidationData[name].required ? true : false;

  const formValidation = () => {
    if (userState.mobilePhone === '' && ValidationData.mobilePhone.required) {
      setPhoneCheck(<p className='input-error'>This field is required.</p>);
    }
    else if (!userState.mobilePhone.match(new RegExp(ValidationData.mobilePhone.regExp))) {
      setPhoneCheck(<p className='input-error'>Invalid phone number entered.</p>);
    }
    else {
      setPhoneCheck('');
    }

    if (userState.email === '' && ValidationData.email.required) {
      setEmailCheck(<p className='input-error'>This field is required.</p>);
    }
    else if (!userState.email.match(new RegExp(ValidationData.email.regExp))) {
      setEmailCheck(<p className='input-error'>Invalid email entered.</p>);
    }
    else {
      setEmailCheck('');
    }

    if (userState.password === '' && ValidationData.password.required) {
      setPasswordCheck(<p className='input-error'>This field is required.</p>);
    }
    else if (userState.password.length < Number(ValidationData.password.minLength) || userState.password.length > Number(ValidationData.password.maxLength)) {
      setPasswordCheck(<p className='input-error'>Password length must be between {ValidationData.password.minLength} and {ValidationData.password.maxLength} symbols.</p>);
    }
    else {
      setPasswordCheck('');
    }

    if (document.getElementById('password2').value !== userState.password) {
      setPassword2Check(<p className='input-error'>Passwords do not match.</p>);
    }
    else {
      setPassword2Check('');
    }
  }

  const handleChange = event => {
    const {name, value} = event.target
    userState[name]  = value;
    formValidation();
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (document.querySelector('.input-error')) {
      alert('Fill out the form correctly.');
    } else {
      props.setStep('Personal Info');
    }
    
  }
  return (
    <form className='sign-up'>
      <div className='wrapper'>
        <div className='sign-up__item'>
          <label htmlFor='phone'>Mobile Phone</label>
          <MaskedInput placeholder='Enter your mobile phone +375...' mask={['+', '3', '7', '5', /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]} value={userState.mobilePhone} onChange={handleChange} name='mobilePhone' id='phone' required={setRequiredStatus('mobilePhone')} />
          {phoneCheck}
        </div>
        <div className='sign-up__item'>
          <label htmlFor='mail'>Email</label>
          {React.createElement('input', {value: userState.email, onChange: handleChange, placeholder: 'Enter your email...', type: 'mail', name: 'email', id: 'mail', required: setRequiredStatus('email')})}
          {emailCheck}
        </div>
        <div className='sign-up__item'>
          <label htmlFor='password'>Password</label>
          {React.createElement('input', {value: userState.password, onChange: handleChange, placeholder: 'Enter password...', type: 'password', name: 'password', id: 'password', required: setRequiredStatus('password')})}
          {passwordCheck}
        </div>
        <div className='sign-up__item'>
          <label htmlFor='password2'>Repeat your password</label>
          {React.createElement('input', {onChange: formValidation, placeholder: 'Repeat password...', type: 'password', name: 'password2', id: 'password2', required: setRequiredStatus('password')})}
          {password2Check}
        </div>
        <button onMouseDown={formValidation} onClick={handleSubmit} className='sign-up__btn'>Next</button>
      </div>
    </form>
  );
}

export default SignUp;
