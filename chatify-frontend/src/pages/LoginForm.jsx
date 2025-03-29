import { useState } from "react";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data.JSON);
            
        } catch (error) {
           console.log("error"+error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
             <p>yes</p>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginForm;
