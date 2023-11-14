import React, {useContext, useEffect, useState} from "react";
import Button from "../shared/button/button.component";
import {useNavigate} from "react-router-dom";
import Navbar from "../shared/nav-bar/navbar.component";
import {UserContext} from "../../context/UserContext";

const Login = (props: any) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authorized, setAuthorized] = useState();

    useEffect(() => {
        if (authorized) {
            console.log("successful login!")
            navigate("/");
        }
    }, [authorized]);

    function handleLoginSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username" : username,
                "password" : password
            })
        };
        fetch("/login", request)
            .then(response => response.json())
            .then(data => setAuthorized(data.authorized))
            .catch(error => console.log("ERROR: " + error));
    }


    const ForgotPassword = (props: {show: boolean}) => {
        return (
            <div hidden={!props.show}>
            <h1>SUCKS</h1>
            </div>
        );
    }


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.name === "username" ? setUsername(event.currentTarget.value) : setPassword(event.currentTarget.value);
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" name="username" value={username} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handleChange}/>
                </div>
                <Button type="submit" keyName="submit" buttonName="login"/>
                <Button type="submit" functionToUse={() => setForgotPassword(!forgotPassword)} keyName="forgot" buttonName="forgot password"/>
            </form>
            <ForgotPassword show={forgotPassword}/>
        </div>
    )
}

export default Login;
