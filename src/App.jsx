import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; // Import your CSS for styles

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      editing: false, // Add an editing state for each task
    };
    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleEditTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, editing: !task.editing } : task
      )
    );
  };

  const saveTask = (id, newText) => {
    if (newText.trim() === '') {
      deleteTask(id);
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, text: newText, editing: false } // Disable editing mode after saving
            : task
        )
      );
    }
  };

  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <>
      <Navbar />

      <section>
        <div className="container">
          <h2>To-Do List</h2>

          <div className="addContainer">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter a new task"
            />
            <button className="addBtn" onClick={addTask}>
              Add
            </button>
          </div>

          <div className="showCompletedContainer">
            <input
              id='showCompletedBox'
              type="checkbox"
              checked={showCompleted}
              onChange={handleShowCompleted}
            />
            <label htmlFor='showCompletedBox'>Show Completed</label>
          </div>

          {tasks
            .filter((task) => (showCompleted ? true : !task.completed))
            .map((task) => (
              <div className="task" key={task.id}>
                {!task.editing && (
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                )}

                {task.editing ? (
                  <input
                    className="editInput"
                    value={task.text}
                    onChange={(e) =>
                      setTasks(
                        tasks.map((t) =>
                          t.id === task.id ? { ...t, text: e.target.value } : t
                        )
                      )
                    }
                  />
                ) : (
                  <p
                    className={`textContainer ${task.completed ? 'completed' : ''
                      }`}
                  >
                    {task.text}
                  </p>
                )}

                <div className="buttonsContainer">
                  {task.editing ? (
                    <button className='saveBtn' onClick={() => saveTask(task.id, task.text)}>
                      <span className="material-icons">save</span>
                    </button>
                  ) : (
                    <>
                      <button onClick={() => toggleEditTask(task.id)}>
                        <span className="material-icons">edit</span>
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        <span className="material-icons">delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
