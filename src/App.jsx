import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const response = localStorage.getItem("tasks");
    const data = JSON.parse(response);
    return data ? data : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const startEditTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  const saveEditTask = () => {
    if (editValue.trim() === "") {
      deleteTask(editIndex);
    } else {
      const updatedTasks = tasks.map((task, index) => {
        if (index === editIndex) {
          return { ...task, text: editValue };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
    setEditIndex(null);
    setEditValue("");
  };  

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    console.log("Ho")
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <h2>iTodo - Manage all your todos here</h2>
          <p>Add A New Todo</p>
          <div className="addContainer">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a new task"
            />
            <button className="addBtn" onClick={addTask}>
              Add
            </button>
          </div>
          <div className="showCompletedContainer">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <label htmlFor="showCompleted">Show Completed</label>
          </div>
          <hr />
          <h3>Your Todo</h3>
          {tasks
            .filter((task) => showCompleted || !task.completed)
            .map((task, index) => (
              <div key={index} className="task">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(index)}
                />
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="editInput"
                      autoFocus
                    />
                    <button className="saveBtn" onClick={saveEditTask}>
                      <span className="material-icons">save</span>
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      className={`textContainer ${
                        task.completed ? "completed" : ""
                      }`}
                    >
                      {task.text}
                    </p>
                    <div className="buttonsContainer">
                      <button className="editBtn" onClick={() => startEditTask(index)}>
                        <span className="material-icons">edit</span>
                      </button>
                      <button onClick={() => deleteTask(index)}>
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;
