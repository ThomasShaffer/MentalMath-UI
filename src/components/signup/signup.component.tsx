import React, {useState} from "react";
import Button from "../shared/button/button.component";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import Navbar from "../shared/nav-bar/navbar.component";

const Signup = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const inputMethodMap = {
        "username": setUsername,
        "password": setPassword,
        "verifyPassword": setVerifyPassword
    };

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        //@ts-ignore
        inputMethodMap[event.currentTarget.id](event.currentTarget.value)
    }

    function handleSignupSubmit(e: React.SyntheticEvent) {

        e.preventDefault();
        verifyPasswordsMatch();
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username" : username,
                "password" : password
            })
        };
        trySignup(request);
    }

    function trySignup(request: RequestInit) {
        try {
            return fetch("/signup", request)
                .then(response => response.json())
                .then(data => console.log(data));
        } catch {
            console.log("some other shit");
            return;
        }
    }

    function verifyPasswordsMatch() {
        if (password !== verifyPassword) {
            alert("passwords dont match");
            setPassword("");
            setVerifyPassword("");
            return;
        }
    }

    return (
        <div>
            <Navbar/>
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
                <Button type="submit" keyName="signup" buttonName="signup"/>
            </form>
        </div>
    )
}

export default Signup;
