import './App.css';
import TodoList from './TodoList';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';

function App() {
  return (
    <div className="login">
      <SignUp/>
      <h1>Or</h1>
      <SignIn/>
    </div>
  );
}

export default App;