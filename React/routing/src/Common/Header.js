import "../App.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
      ></img>
      <div className="links">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/cart"}>Cart</NavLink>
        <NavLink to={"/search"}>Search</NavLink>
      </div>
    </header>
  );
};

export default Header;
