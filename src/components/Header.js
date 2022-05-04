import React, {useContext} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthApi from "../services/AuthApi";
import AuthContext from "../context/AuthContext";

const Header = ({history}) => {

    const context = useContext(AuthContext);
    let payload = ""
    if (context.isAuth) payload = jwtDecode(localStorage.getItem("token"));

    const handleLogOut = () => {
        AuthApi.logOut()
        context.setAuth(false);
        history.push("/login");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">Brûlerie</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Accueil</Link>
                        <Link to="/produits" className="nav-link">Produits</Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={
                            context.isAuth &&
                                (payload["prenom"] + " " + payload["nom"]) ||
                                ("Compte")
                        } id="basic-nav-dropdown">
                            {
                                context.isAuth && (
                                    <>
                                        <Link to="/admin" className="dropdown-item">Panel Administrateur</Link>
                                        <hr/>
                                        <button onClick={handleLogOut} className="dropdown-item">Déconnexion</button>
                                    </>
                                ) || (
                                    <>
                                        <Link to="/login" className="dropdown-item">Connexion</Link>
                                        <Link to="/register" className="dropdown-item">Inscription</Link>
                                    </>
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;