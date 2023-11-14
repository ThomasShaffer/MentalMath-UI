import React, {useEffect, useState} from "react";
import CustomButton from "../shared/button/button.component";
import {Button, ButtonGroup, Dropdown, DropdownButton, Modal, Stack} from "react-bootstrap";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import Navbar from "../shared/nav-bar/navbar.component";
import {useNavigate} from "react-router-dom";

const Signup = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [created, setCreated] = useState();

    const navigate = useNavigate();

    const inputMethodMap = {
        "username": setUsername,
        "password": setPassword,
        "verifyPassword": setVerifyPassword
    };

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        //@ts-ignore
        inputMethodMap[event.currentTarget.id](event.currentTarget.value)
    }

    useEffect( () => {
       console.log(created);
    }, [created]);

    function handleSignupSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!verifyPasswordsMatch()) return;
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username" : username,
                "password" : password
            })
        };
        fetch("/signup", request)
            .then(response => response.json())
            .then(data => setCreated(data.successful))
            .catch(error => console.log(error));
    }


    const verifyPasswordsMatch = (): Boolean => {
        if (password === verifyPassword) return true;
        alert("passwords dont match");
        setPassword("");
        setVerifyPassword("");
        return false;
    }

    const CreatedPopup = (props: {created: undefined|boolean}) => {
        return (
            <Modal show={props.created!==undefined && props.created} animation={true} style={{alignSelf: 'center'}} size="lg" centered>
                <br/>
                <Modal.Title style={{alignSelf: 'center'}} id="contained-modal-title-vcenter"> created user: {username} </Modal.Title>
                <Modal.Footer id="contained-modal-title-vcenter">
                    <Stack>
                        <Button onClick={() => navigate('/')}> home </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <form onSubmit={handleSignupSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username" value={username} placeholder="required" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} placeholder="required" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="verifyPassword" className="form-label">Verify Password</label>
                    <input type="password" className="form-control" id="verifyPassword" value ={verifyPassword} placeholder="required" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="socialSecurity" className="form-label">Social Security Number</label>
                    <input type="socialSecurity" className="form-control" id="socialSecurity"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="creditCard" className="form-label">Credit Card Number</label>
                    <input type="creditCard" className="form-control" id="creditCard"/>
                </div>
                <CustomButton type="submit" keyName="signup" buttonName="signup"/>
            </form>
            <CreatedPopup created={created}/>
        </div>
    )
}

export default Signup;
