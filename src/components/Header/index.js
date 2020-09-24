import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src="./../../" alt="LOGO" />
          </Link>
        </div>
        <div className="callToAction">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>Logout</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};


//export default connect(mapStateToProps, null)(Header);
export default Header;
