import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ThemeButton from "../components/ThemeButton";

export default function Home(){
    return(
        <div>
          <SignUp/>
          <SignIn/>
        </div>
    );
}
