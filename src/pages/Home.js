import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function Home(){
    return(
        <div className="login">
        <SignUp/>
        <h1>Or</h1>
        <SignIn/>
      </div>
    );
}
