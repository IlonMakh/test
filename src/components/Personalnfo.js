import React, { useState } from 'react';
import userState from '../data/userState';
import ValidationData from '../data/ValidationData.json';

function PersonalInfo(props) {
  const [firstNCheck, setFirstNCheck] = useState('');
  const [lastNCheck, setLastNCheck] = useState('');
  const [sexCheck, setSexCheck] = useState('');
  const [birthdayCheck, setBirthdayCheck] = useState('');
  const [hobbyCheck, setHobbyCheck] = useState('');
  const setRequiredStatus = name => ValidationData[name].required ? true : false;

  const birthdayValidation = () => {
    const nowYears = new Date().getFullYear();
    const birthday = new Date(`${userState.birthdayDay}-${userState.birthdayMonth}-${userState.birthdayYear}`).getFullYear();
    const youngLimit = +(ValidationData.birthday.minAge);
    const oldLimit = +(ValidationData.birthday.maxAge);
    if ((userState.birthdayDay === '' || userState.birthdayMonth === '' || userState.birthdayYear === '')  && ValidationData.birthday.required) {
      setBirthdayCheck(<p className='input-error'>This field is required.</p>);
    } else if (+(userState.birthdayDay) > 31 || +(userState.birthdayMonth) > 12 || +(userState.birthdayYear) > nowYears ||
    +(userState.birthdayDay) < 1 || +(userState.birthdayMonth) < 1 || +(userState.birthdayYear) < 1922){
      setBirthdayCheck(<p className='input-error'>Something wrong with your birthday.</p>);
    } else if (nowYears - birthday  < youngLimit || nowYears - birthday > oldLimit) {
      setBirthdayCheck(<p className='input-error'>Your age must be between {youngLimit} and {oldLimit}.</p>);
    } else {
      setBirthdayCheck('');
    }
  }

  const formValidation = () => {
    if (userState.firstName === '' && ValidationData.firstName.required) {
      setFirstNCheck(<p className='input-error'>This field is required.</p>);
    }
    else if (userState.firstName.length < ValidationData.firstName.minLength || userState.firstName.length > ValidationData.firstName.maxLength) {
      setFirstNCheck(<p className='input-error'>First name length must be between {ValidationData.firstName.minLength} and {ValidationData.firstName.maxLength} symbols.</p>);
    }
    else {
      setFirstNCheck('');
    }

    if (userState.lastName === '' && ValidationData.lastName.required) {
      setLastNCheck(<p className='input-error'>This field is required.</p>);
    }
    else if (userState.lastName.length < ValidationData.lastName.minLength || userState.lastName.length > ValidationData.lastName.maxLength) {
      setLastNCheck(<p className='input-error'>Last name length must be between {ValidationData.lastName.minLength} and {ValidationData.lastName.maxLength} symbols.</p>);
    }
    else {
      setLastNCheck('');
    }

    if (userState.sex === '' && ValidationData.sex.required) {
      setSexCheck(<p className='input-error'>This field is required.</p>);
    }
    else {
      setSexCheck('');
    }

    if (!document.querySelectorAll('input[type=checkbox]:checked').length && ValidationData.hobby.required) {
      setHobbyCheck(<p className='input-error'>This field is required. Choose one or several variants.</p>);
    } else {
      setHobbyCheck('');
    }

    birthdayValidation();
  }
  
  const handleChange = event => {
    const {name, value} = event.target
    if (name === 'hobby') {
      if (event.target.checked) {
        userState.hobby.push(value);
      } else {
        userState.hobby.splice(userState.hobby.indexOf(value), 1);
      }
    } else { 
      userState[name]  = value;
    }
    formValidation();
  };

  const handleBack = () => props.setStep('SignUp Info');

  const handleSubmit = event => {
    event.preventDefault();
    if (document.querySelector('.input-error')) {
      alert('Fill out the form correctly.');
    } else {
      props.setStep('Result');
      document.body.classList.add('shadow');
    }
  }

  const oceans = ValidationData.ocean.oneOf.map((ocean) => `<option value = '${ocean}'>${ocean}</option>`).join('');
  const hobbies = ValidationData.hobby.anyOf.map((hobby) => <div className='hobby__item' key={hobby}><input onChange={handleChange} type='checkbox' name='hobby' value={hobby} id={hobby}></input><label htmlFor={hobby}>{hobby}</label></div>);
  
  return (
    <form className='personal-info'>
      <div className='wrapper'>
        <div className='personal-info__item'>
          <label htmlFor='first-name'>First name</label>
          {React.createElement('input', {defaultValue: userState.firstName, onChange: handleChange, placeholder: 'Enter your first name...', type: 'text', name: 'firstName', id: 'first-name', required: setRequiredStatus('firstName')})}
          {firstNCheck}
        </div>
        <div className='personal-info__item'>
          <label htmlFor='last-name'>Last name</label>
          {React.createElement('input', {defaultValue: userState.lastName, onChange: handleChange, placeholder: 'Enter your last name...', type: 'text', name: 'lastName', id: 'last-name', required: setRequiredStatus('lastName')})}
          {lastNCheck}
        </div>
        <div className='personal-info__item'>
          <label htmlFor='sex'>Sex</label>
          <div id='sex'>
            <div className='sex__item'>
              <input onChange={handleChange} value='Male' type='radio' name='sex' id='sex1' required={setRequiredStatus('sex')} />
              <label htmlFor='sex1'>Male</label>
            </div>
            <div className='sex__item'>
              <input onChange={handleChange} value='Female' type='radio' name='sex' id='sex2' required={setRequiredStatus('sex')} />
              <label htmlFor='sex2'>Female</label>
            </div>
          </div>
          {sexCheck}
        </div>
        <div className='personal-info__item'>
          <label htmlFor='birthday'>Birthday</label>
          <div id='birthday'>
            <input onChange={handleChange} type='number' min='1' max='31' placeholder='DD' name='birthdayDay' id='day' required={setRequiredStatus('birthday')}/>
            <input onChange={handleChange} type='number' min='1' max='12' placeholder='MM' name='birthdayMonth'  id='month' required={setRequiredStatus('birthday')}/>
            <input onChange={handleChange} type='number' min='1922' max='2022' placeholder='YYYY' name='birthdayYear'  id='year' required={setRequiredStatus('birthday')}/>
          </div>
          {birthdayCheck}
        </div>
        <div className='personal-info__item'>
          <label htmlFor='ocean'>Choose your favorite ocean</label>
          <select onChange={handleChange} name='ocean' id='ocean' dangerouslySetInnerHTML={{__html: oceans}}>
          </select>
        </div>
        <div className='personal-info__item'>
          <label htmlFor='hobby'>Choose your hobby</label>
          <div id='hobby'>{hobbies}</div>
          {hobbyCheck}
        </div>
        <div className='personal-info__btns'>
          <button onClick={handleBack} className='change-btn'>Change</button>
          <button onMouseDown={formValidation} onClick={handleSubmit} className='complete-btn'>Complete</button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
