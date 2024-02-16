import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const signIn = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/todolist");
        } catch(error){
            alert("Sign-in error: "+error.message);
        }

    }
    return(
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Log in</h1>
                <input 
                    type="email" 
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
};

export default SignIn;