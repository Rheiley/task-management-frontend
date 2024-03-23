import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import TodoList from './pages/TodoList';
import ThemeButton from './components/ThemeButton';

function App() {
  return (
    <div>
      <ThemeButton/>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = "/home" element = {<Home/>}/>
          <Route path = "/todolist" element = {<TodoList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;