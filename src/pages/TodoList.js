import React, { useState } from "react";
import axios from "axios";
import AuthDetails from "../components/AuthDetails";
import SignOut from "../components/auth/SignOut";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const endpoint = "http://localhost:8080/api/tasks";

  const handleAddTask = () => {
    if(newTask.trim() !== ""){
        const newTaskObject = {taskName: newTask.trim(), description: "", completed: false};

        axios.post(endpoint, newTaskObject)
            .then(response => {
                setTasks([...tasks, {
                    id: response.data.id,
                    taskName: response.data.taskName.trim(),
                    description: response.data.description.trim(),
                    completed: response.data.completed
                }]);
                setNewTask("");
            })
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    const taskId = tasks[index].id;
    
    axios.delete(endpoint+"/"+taskId)

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

    axios.put(endpoint+"/"+taskId, updatedTask);
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
            <li key={index} style={{ display: "flex" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleToggleTask(index)}
                />
                <span
                  style={{
                    marginRight: "10px",
                    taskNameDecoration: task.checked ? "line-through" : "none",
                  }}
                >
                  {task.taskName}
                </span>
                <input
                  class="desc"  
                  type="taskName"
                  placeholder="Description"
                  value={task.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                />
                <button
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <SignOut/>
    </div>
  );
};

export default TodoList;