import logo from "../images/logo/logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      {children}
    </header>
  )
}

export default Header;
