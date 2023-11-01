import React, {useState} from "react";
import Button from "../shared/button/button.component";
import {useNavigate} from "react-router-dom";
import Navbar from "../shared/nav-bar/navbar.component";

const Login = (props: any) => {
    const navigate = useNavigate();
    const [forgotPassword, setForgotPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authorized, setAuthorized] = useState(false);

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
        tryLogin(request);
    }

    function tryLogin(request: RequestInit) {
        try {
            fetch("/login", request)
                .then(response => response.json())
                .then(data => setAuthorized(data.authorized))
        } catch (error) {
            console.log("ERROR: " + error);
        } finally {
            authorized ?  navigate("/") : console.log("cant login");
        }
    }

    function handleForgotPasswordSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        //will implement later
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.name === "username" ? setUsername(event.currentTarget.value) : setPassword(event.currentTarget.value)
    }

    //known bug... changing the username.password initially causes an issue but only on the first submit
    return (
        <div>
            <Navbar/>
            <form onSubmit={forgotPassword ? handleForgotPasswordSubmit : handleLoginSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" name="username" value={username} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handleChange}/>
                </div>
                <Button type="submit" keyName="submit" buttonName="login"/>
                <Button type="submit" functionToUse={() => navigate("/")} keyName="forgot" buttonName="forgot password"/>
            </form>
        </div>
    )
}

export default Login;
