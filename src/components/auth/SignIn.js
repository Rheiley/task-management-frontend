import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {GoogleButton} from "react-google-button";

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

    const handleGoogleSignIn = async (e) => {
        const provider = await new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        navigate("/todolist");
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
            <GoogleButton className = "google-button" onClick={handleGoogleSignIn}></GoogleButton>
        </div>
    )
};

export default SignIn;