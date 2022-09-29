import userState from '../data/userState';

function ResultModal(props) {
  const handleClose = () => {
    props.setStep('SignUp Info');
    document.body.classList.remove('shadow');
    window.location.reload();
  };

  return (
    <div className='modal'>
      <h4 className='modal__title'>Entered data</h4>
      <div className='modal__info'>
        <div className='modal__info_name'><strong>Your name:</strong> {userState.firstName} {userState.lastName}</div>
        <div className='modal__info_sex'><strong>Your sex:</strong> {userState.sex}</div>
        <div className='modal__info_birthday'><strong>Your birthday:</strong> {userState.birthdayDay}/{userState.birthdayMonth}/{userState.birthdayYear}</div>
        <div className='modal__info_phone'><strong>Your mobile phone: </strong>{userState.mobilePhone}</div>
        <div className='modal__info_email'><strong>Your email: </strong>{userState.email}</div>
        <div className='modal__info_password'><strong>Your password:</strong> {userState.password}</div>
        <div className='modal__info_ocean'><strong>Your favorite ocean:</strong> {userState.ocean} ocean</div>
        <div className='modal__info_hobby'><strong>Your hobby:</strong> {userState.hobby.join(', ')}</div>
        <button onClick={handleClose} className='modal__close-btn'></button>
      </div>
    </div>
  );
}

export default ResultModal;
