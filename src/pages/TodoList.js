import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthDetails from "../components/AuthDetails";
import SignOut from "../components/auth/SignOut";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const endpoint = "http://localhost:8080/api/tasks";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const user = auth.currentUser;
        if(user){
          const response = await axios.get(`${endpoint}/${user.uid}/user-tasks`)
          setTasks(response.data);
        }
      } catch(error){
        alert("Error loading tasks");
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(!user){
        navigate("/home"); // if the user is not logged in, redirect to home page.
      }else{
        fetchTasks();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAddTask = () => {
    const user = auth.currentUser;

    if(newTask.trim() !== ""){
        const newTaskObject = {
          taskName: newTask.trim(), 
          description: "", 
          completed: false,
          userUid: user.uid
        };

        axios.post(endpoint, newTaskObject)
            .then(response => {
                setTasks([...tasks, {
                    id: response.data.id,
                    taskName: response.data.taskName.trim(),
                    description: response.data.description.trim(),
                    completed: response.data.completed,
                    userUid: response.data.userUid
                }]);
                setNewTask("");
            })
            .catch(error => {
              alert("Error adding task");
            });
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    const taskId = tasks[index].id;
    
    axios.delete(endpoint+"/"+taskId)
      .catch(error => {
        alert("Error deleting task");
      });

    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleToggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  const handleDescriptionChange = (index, description) => {
    const newTasks = [...tasks];
    newTasks[index].description = description;
    setTasks(newTasks);

    const taskId = newTasks[index].id;

    const updatedTask = newTasks[index];

    axios.put(endpoint+"/"+taskId, updatedTask)
      .catch(error => {
        alert("Error updating task");
      });
  };

  return (
    <div>
      <AuthDetails/>
      <h1 className="title">To-Do List</h1>
      <section className="main">
        <input
          type="taskName"
          placeholder="Task name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
        <ul className="list">
        {tasks.map((task, index) => (
        <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={task.checked}
            onChange={() => handleToggleTask(index)}
          />
          <span
            className="taskName"
            style={{
              marginRight: "10px",
              textDecoration: task.checked ? "line-through" : "none",
            }}
          >
            {task.taskName}
          </span>
          <input
            className="desc"  
            type="text"
            placeholder="Description"
            value={task.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
          <button
            style={{ marginLeft: "10px", marginTop: "5px", marginBottom: "5px" }}
            onClick={() => handleDeleteTask(index)}
          >
            Delete
          </button>
        </li>
      ))}
        </ul>
      </section>
      <SignOut/>
    </div>
  );
};

export default TodoList;