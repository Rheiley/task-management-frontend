import React, { useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask.trim(), description: "", checked: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = [...tasks];
    newTasks.splice(id, 1);
    setTasks(newTasks);
  };

  const handleToggleTask = (id) => {
    const newTasks = [...tasks];
    newTasks[id].checked = !newTasks[id].checked;
    setTasks(newTasks);
  };

  const handleDescriptionChange = (id, description) => {
    const newTasks = [...tasks];
    newTasks[id].description = description;
    setTasks(newTasks);
  };

  return (
    <div>
      <h1 className="title">To-Do List</h1>
      <section className="main">
        <input
          type="text"
          placeholder="Task name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
        <ul className="list">
          {tasks.map((task, id) => (
            <li key={id} style={{ display: "flex" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleToggleTask(id)}
                />
                <span
                  style={{
                    marginRight: "10px",
                    textDecoration: task.checked ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <input
                  class="desc"  
                  type="text"
                  placeholder="Description"
                  value={task.description}
                  onChange={(e) => handleDescriptionChange(id, e.target.value)}
                />
                <button
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                  onClick={() => handleDeleteTask(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TodoList;
