import React, {useContext, useState} from "react";
import "./navbar.css";
import "../../../App.css";
import {Container, Nav, Navbar as Navb, NavDropdown} from "react-bootstrap";
import {UserContext} from "../../../context/UserContext";




const Navbar = (props: any) => {
    const userContext = useContext(UserContext);
    const buttonPages = ["play", "login", "signup", "leaderboard", "algorithms"]
    const [username, setUserName] = useState("");

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
                <Navb.Collapse className="justify-content-end">
                    <Navb.Text> {userContext} </Navb.Text>
                </Navb.Collapse>
            </Container>
        </Navb>
    )
}

export default Navbar;
