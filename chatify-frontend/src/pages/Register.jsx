import axios from "axios";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [responseData, setResponseData] = useState(null); 

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/signup", {
                firstname,
                lastname,
                password,
                username
                
            }, {
                headers: { 
                    "Content-Type": "application/json",
                }
            });

            setResponseData(response.status);
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}> 
                <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" /><br/>
                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" /><br/>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" /><br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                <button type="submit">Register</button> {/* Fix: Use a button instead of input */}
            </form>
            {responseData && <div>Response: {JSON.stringify(responseData)}</div>} {/* Fix: Display response */}
        </div>
    );
}

export default Register;
