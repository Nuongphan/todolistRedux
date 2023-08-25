import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "../index.css";
import {ITodo, InitialState}  from "./type"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ToDoList() {
    const todoList = useSelector((state: InitialState) => state.todos);
     const dispatch = useDispatch(); 
    const [todo, setToDo]=useState("")
    function handleAddToDoList() {
        if (todo.trim() != "") {
            const newToDo: ITodo= {
                id: Math.floor(Math.random() * 100),
                title: todo.trim(),
                status: false
            }
            dispatch({ type: "ADD_TODO", payload: newToDo });
            setToDo("")
        }    
  }
    function handleDeleteToDo(id: number) {
      dispatch({type:"DELETE_TODO", payload: id})
    }
    function handleUpdate(id:number) {
dispatch({type:"UPDATE_TODO", payload:id})
    }

  return (
    <>
      <div className="container-todolist">
        <h1>Todo List</h1>
        <p>Get things done, one item at a time</p>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <p
                style={{
                  textDecoration: todo.status ? "line-through" : "none",
                }}
              >
                {todo.title}
              </p>
              <div className="checkComplete">
                <button>
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleUpdate(todo.id);
                    }}
                  />
                </button>
                <button onClick={() => handleDeleteToDo(todo.id)}>
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="addToDoList">
          <p>Add the todo list</p>
          <input
            className="inputAdd"
            type="text"
            onChange={(e) => {
              setToDo(e.target.value);
            }}
            value={todo}
          />
          <button onClick={handleAddToDoList}>Add</button>
        </div>
      </div> 
    </>
  );
}

export default ToDoList;
