function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">&copy; {year} Mesto Russia</footer>
  )
}

export default Footer;
