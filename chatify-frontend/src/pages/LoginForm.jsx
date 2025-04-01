import axios from "axios";
import { useState } from "react";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Store error messages

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", 
                { username, password }, 
                { headers: { "Content-Type": "application/json" } }
            );

            setErrorMessage(""); 
            
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            alert("Login Error:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin}>
        <div class="form-group">
          <label for="exampleInputEmail1">username</label>
          <input type="email"value={username} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password"value={password} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    );
}

export default LoginForm;
