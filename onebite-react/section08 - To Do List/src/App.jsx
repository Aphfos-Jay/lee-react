import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Editor from "./components/Editor";
import { useState, useRef, useReducer, useCallback } from "react";

//리렌더가 필요 없음
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "헬스장가기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "DAsP 공부하기",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.data ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.data);
    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData); // Section09  useReducer
  const idRef = useRef(3);

  // const onCreate = (content) => {
  //   // Section09  useReducer
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: idRef.current++,
  //       isDone: false,
  //       content: content,
  //       date: new Date().getTime(),
  //     },
  //   });

  //   // const newTodo = {
  //   //   id: idRef.current++,
  //   //   isDone: false,
  //   //   content: content,
  //   //   date: new Date().getTime(),
  //   // };

  //   // setTodos([newTodo, ...todos]);
  // };

  // const onUpdate = (targetId) => {
  //   // Section09  useReducer
  //   dispatch({
  //     type: "UPDATE",
  //     data: targetId,
  //   });
  //   // todos state의 값들 중에 targetId와 일치하는 id를 가진 투두 아이템의 isDone 변경
  //   // setTodos(
  //   // todos.map((todo) => {
  //   //   if (todo.id === targetId) {
  //   //     return {
  //   //       ...todo,
  //   //       isDone: !todo.isDone,
  //   //     };
  //   //   } else {
  //   //     return todo;
  //   //   }
  //   // })
  //   // );
  // };

  // const onDelete = (targetId) => {
  //   // Section09  useReducer
  //   dispatch({
  //     type: "DELETE",
  //     data: targetId,
  //   });
  //   // setTodos(todos.filter((todo) => todo.id !== targetId));
  // };

  /**
   * Section10
   * useCallback
   * 마운트 될때 딱 한번만 실행시켜서 이후 반복적인 리렌더를 하지 못 하게 막음
   */
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      data: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      data: targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
