import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { push } from "connected-react-router";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../images/logoHeder.png";
import "./header.css";
import LOGO from "../../images/CUU _Alians_ (1).svg";

const Header = () => {
  const dispatch = useDispatch();

  const {
    auth,
    //, cart
  } = useSelector((redux) => redux);
  //console.log("Id current prod:", cart.count);
  const onClickLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(push("/"));
  };

  const ref = useRef(null);

  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setNavExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  //console.log("Auth user info ", auth);

  return (
    <Navbar
      ref={ref}
      //bg="light"
      expand="lg"
      onToggle={setNavExpanded}
      expanded={navExpanded}
      //className="navbar-light"
      //style="background-color: #e3f2fd;"
      className="headerHead"
      //style="background-color:rgb(20, 236, 70);"
      //className="navbar navbar-expand-mt-3 navbar-dark bg-dark"
      //   class="navbar navbar-light" style="background-color: #e3f2fd;"
    >
      <Container>
        <img src={logo} alt="" width="80" />
        <Link className="navbar-logo" to="/">
          РMО КСУ "Альянс"
        </Link>
        {/* <Link className="navbar-brand active" to="/">
          <img className="logoImg" src={LOGO} alt="Auction" />
           РMО КСУ "Альянс" 
        </Link> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onClick={() => setNavExpanded(false)}>
            <Link
              className="nav-link"
              id="rotating-text"
              aria-current="page"
              to="/about"
            >
              Про нас
            </Link>
            <Link className="nav-link" aria-current="page" to="/news">
              Новини
            </Link>
            <Link className="nav-link" aria-current="page" to="/RegisterShow">
              Реєстрація
            </Link>
            <Link className="nav-link" aria-current="page" to="/noMatch">
              Розплідники
            </Link>
          </Nav>
          {!auth.isAuth ? (
            <Nav onClick={() => setNavExpanded(false)}>
              <Link className="nav-link" to="/login">
                <i className="pi pi-sign-in" style={{ fontSize: "1rem" }}></i>
                {/* Вхід */}
              </Link>
              {/* <Link className="nav-link" to="/register">
                Реєструватися
              </Link> */}
            </Nav>
          ) : (
            <Nav onClick={() => setNavExpanded(false)}>
              {/* <Link className="nav-link" to="/cart">
                <i
                  className="pi pi-shopping-cart"
                  style={{ fontSize: "2rem" }}
                ></i>
                {cart.count}
              </Link> */}

              <Link className="nav-link" to="/profile">
                {auth.user.name}
              </Link>
              <Link className="nav-link" to="/logout" onClick={onClickLogout}>
                <i className="pi pi-sign-out" style={{ fontSize: "1rem" }}></i>
                {/* Вихід */}
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
