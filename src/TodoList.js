import React, { useState } from "react";

const TodoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("")

    const handleAddTask = () => {
        if(newTask.trim() !== ""){
            setTasks([...tasks, {text: newTask.trim(), checked: false}]);
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

    return(
        <div>
            <h1 class="title">To-Do List</h1>
            <section class="main">
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
            <button onClick={(handleAddTask)}>Add</button>
            <ul class="list">
                {tasks.map((task, id) => (
                    <li key={id} style={{display: "flex"}}>
                        <div style = {{display: "flex", alignItems: "center"}}>
                            <input 
                                type="checkbox" 
                                checked={task.checked} 
                                onChange={() => handleToggleTask(id)}
                            />
                            <span style={{marginRight: "10px", textDecoration: task.checked ? "line-through" : "none"}}>{task.text}</span>
                            <button style={{marginTop: "5px", marginBottom: "5px"}} onClick={() => handleDeleteTask(id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            </section>
        </div>
    );
};

export default TodoList;