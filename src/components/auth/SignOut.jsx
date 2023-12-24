import React from "react";
import { auth } from "../../firebase";
import { signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const navigate = useNavigate();
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        navigate("/home");
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    };
  
    return (
      <button onClick={handleSignOut}>
        Sign Out
      </button>
    );
  };
  
  export default SignOut;