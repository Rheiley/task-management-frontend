import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function Home(){
    return(
        <div className="login">
          <SignUp/>
          <SignIn/>
        </div>
    );
}
