import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password);
    }
    return(
        <div className='sign-up-container'>
            <form onSubmit={signUp}>
                <h1>Create account</h1>
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
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
};

export default SignUp;