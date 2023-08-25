import { legacy_createStore as createStore } from "redux";
import {
  InitialState,
} from "./ToDoList/type";
const initialState: InitialState = {
  todos: [
    { id: 1, title: "Ăn mít", status: false },
    { id: 2, title: "Ăn nhãn", status: false },
    { id: 3, title: "Ăn chè bưởi", status: false },
    { id: 4, title: "Ăn bánh ép", status: false },
    { id: 5, title: "Ăn ốc", status: false }
  ]
} 
const store = createStore(
  (state: InitialState = initialState, action: any) => {
    switch (action.type) {
      case "ADD_TODO":
        return { todos: [...state.todos, action.payload] };
      case "DELETE_TODO":
        return {
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case "UPDATE_TODO":
        return {
          todos: state.todos.map((todo) =>
            todo.id == action.payload ? { ...todo, status: true } : todo
          )
        };
      default:
        return state;
    }
  }
);
export default store

