import Logo from '../assets/logo.svg';

function Footer() {
  return (
    <footer className='footer'>
      <div className='wrapper'>
        <div className='footer__logo'>
          <img src={Logo} alt='logo'></img>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
