import React, { useState } from "react";
import "./Stride.css";

function App() {
  const [todoLists, setTodoLists] = useState([]);
  const [inputListName, setInputListName] = useState("");
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedListId, setSelectedListId] = useState(null);
  const [isEditingListName, setIsEditingListName] = useState(false);
  const [editingListName, setEditingListName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [listDueDate, setListDueDate] = useState("");
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  
  // Update selectedListId when a new todo list is added
  const handleAddTodoList = () => {
    const newList = { id: Date.now(), name: inputListName, todos: [] };
    setTodoLists([...todoLists, newList]);
    setInputListName("");
    setSelectedListId(newList.id); // Set the id of the new list as the selectedListId
    setShowAddListForm(false);
  };

  const handleDeleteTodoList = (id) => {
    setTodoLists(todoLists.filter((list) => list.id !== id));
  };

  const handleEditTodoListName = (id) => {
    const updatedLists = todoLists.map((list) => {
      if (list.id === id) {
        return { ...list, name: editingListName };
      }
      return list;
    });
    setTodoLists(updatedLists);
    setIsEditingListName(false);
    setEditingListName("");
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const updatedLists = todoLists.map((list) => {
      if (list.id === selectedListId) {
        if (editIndex >= 0) {
          list.todos[editIndex] = input;
          setEditIndex(-1);
        } else {
          list.todos.push(input);
        }
      }
      return list;
    });
    setTodoLists(updatedLists);
    setInput("");
    setShowAddTaskModal(false);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDelete = (index) => {
    const updatedLists = todoLists.map((list) => {
      if (list.id === selectedListId) {
        list.todos = list.todos.filter((_, i) => i !== index);
      }
      return list;
    });
    setTodoLists(updatedLists);
  };

  const handleEdit = (index) => {
    setInput(todoLists.find((list) => list.id === selectedListId).todos[index]);
    setEditIndex(index);
  };

  const selectedList = todoLists.find((list) => list.id === selectedListId);

  return (
    <div className="Stride">
      <header className="App-header">
        <img src="/Stride_Logo.png" alt="Stride Logo" className="logo" />
        <h1 className="title">Task Manager</h1>
        <div className="date">{new Date().toLocaleDateString()}</div>
      </header>
      
      <div className="App-body">
        {showAddListForm ? (
        <>
        <input
          className="inputListName"
          value={inputListName}
          onChange={(e) => setInputListName(e.target.value)}
          placeholder="New list name"
        />
        <button onClick={handleAddTodoList}>Add Todo List</button>
        </>)
        : (<></>)
      }
      {todoLists.map((list) => (
        <div key={list.id}>
          {isEditingListName && selectedListId === list.id ? (
            <>
              <input
                value={editingListName}
                onChange={(e) => setEditingListName(e.target.value)}
              />
              <button onClick={() => handleEditTodoListName(list.id)}>
                Save
              </button>
            </>
          ) : (
            <>
              <div>
                <div className="list-header">
                  <img src="/clipboard.png" alt="Clipboard" className="clipboard-icon" />
                  <div className="list-header">
                    <div>
                      <span
                        className={`list-name ${selectedListId === list.id ? "selected" : ""}`}
                        onClick={() => setSelectedListId(list.id)}
                      >
                        {list.name}
                      </span>
                      <img 
                      src="/create.svg" 
                      alt="Edit" 
                      onClick={() => {
                        setIsEditingListName(true);
                        setEditingListName(list.name);
                      }} 
                    />
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <p>Total Tasks: {list.todos.length}</p>
                          <button onClick={() => setShowAddTaskModal(true)} className="add-task-button">
                            <span className="add-task-text">
                              <img src="/post_add.svg" alt="Add Task"/>
                              ADD TASK
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      {todoLists.length === 0 ? (
        <div className="empty-container">
        <div className="empty-state">
          <h2>You have no task lists!</h2>
          <button className="create-list-button" onClick={() => setShowAddListForm(true)}>
            <span>+</span> Create A Task List
          </button>
        </div>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedList &&
                selectedList.todos.map((todo, index) => (
                  <tr key={index}>
                    <td>{todo}</td>
                    <td>
                      <img src="/create.svg" alt="Edit" onClick={() => handleEdit(index)} />
                      <img src="/delete.svg" alt="Delete" onClick={() => handleDelete(index)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showAddTaskModal && (
            <div className="modal">
              <button onClick={() => setShowAddTaskModal(false)}>Close</button>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="New task"
              />
              <button onClick={handleAddTodo}>Add Task</button>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
}

export default App;
