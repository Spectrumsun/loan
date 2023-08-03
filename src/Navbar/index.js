import './index.css';

const Navbar = ({ setActive, active, setCurrent }) => {

  const handleClick = (value, screen) => {
    setActive(value)
    setCurrent(screen)
  };
  
  return (
    <header className="header">
      <h1 className="header-h1">PrimeBase</h1>
      <ul className="header-ul">
        <li 
          className={`header-li ${active === "Request a loan" ? "header-active" : ""}`}
          onClick={() => handleClick('Request a loan', 'request')}
        >
          Request a loan
        </li>
        <li 
          className={`header-li ${active === "All loan request" ? "header-active" : ""}`}
          onClick={() => handleClick('All loan request', 'all')}
        >
          All loan request
        </li>
        <li 
          className={`header-li ${active === "Get repayment schedule" ? "header-active" : ""}`}
          onClick={() => handleClick('Get repayment schedule', 'get')}
        >
          Get repayment schedule
        </li>
      </ul>
    </header>
  )
}

export default Navbar;
