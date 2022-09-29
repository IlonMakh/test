import Logo from '../assets/logo.svg';

function Header() {
  return (
    <header className='header'>
      <div className='wrapper'>
        <div className='header__logo'>
          <img src={Logo} alt='logo'></img>
        </div>
      </div>
    </header>
  );
}

export default Header;
