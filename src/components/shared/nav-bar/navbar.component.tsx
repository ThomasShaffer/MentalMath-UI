import React from "react";
import "./navbar.css";
import {Container, Nav, Navbar as Navb, NavDropdown} from "react-bootstrap";




const Navbar = (props: any) => {
    const buttonPages = ["play", "login", "signup", "leaderboard", "algorithms"]

    function renderList(button: string, index: number) {
        return (
            <div key={button}>
                <NavDropdown.Item href={button} key={button + index}>{button}</NavDropdown.Item>
                <NavDropdown.Divider key={button} />
            </div>
        )
    }

    return (
        <Navb variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navb.Brand href="/">Mental Math Trainer</Navb.Brand>
                <Navb.Toggle aria-controls="navbar-dark-example" />
                <Navb.Collapse>
                    <Nav>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Select"
                            menuVariant="dark">
                            {buttonPages.map((button, index: number) => renderList(button, index))}
                        </NavDropdown>
                    </Nav>
                </Navb.Collapse>
            </Container>
        </Navb>
    )
}

export default Navbar;
