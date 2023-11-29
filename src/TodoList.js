import React, { useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const endpoint = "http://localhost:8080/api/tasks";

  const handleAddTask = () => {
    if(newTask.trim() !== ""){
        const newTaskObject = {taskName: newTask.trim(), description: "", completed: false};

        axios.post(endpoint, newTaskObject)
            .then(response => {
                const createdTask = response.data;
                setTasks([...tasks, {
                    id: response.data.id,
                    taskName: response.data.taskName.trim(),
                    description: response.data.description.trim(),
                    completed: response.data.completed
                }]);
                setNewTask("");
            })
            .catch(error => {
                console.error("Error adding task: ", error);
            });
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

    const updatedTask = newTasks[id];

    axios.put(endpoint+"/"+id, updatedTask);
  };

  return (
    <div>
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