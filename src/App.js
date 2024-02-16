import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import TodoList from './pages/TodoList';

function App() {
  return (
    <div>
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