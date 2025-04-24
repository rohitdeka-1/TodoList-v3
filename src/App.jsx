import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      console.log("Invalid Input");
    } else {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-gradient-to-br from-black via-[#0f172a] to-[#1e293b] min-h-screen text-white px-6 py-12 font-mono">
      <h1 className="text-5xl font-bold text-center text-cyan-400 mb-10 drop-shadow-md">
        TodoList
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex gap-4 items-center justify-center mb-12"
      >
        <input
          value={input}
          onChange={handleChange}
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 px-4 py-3  rounded-xl bg-[#1e293b] border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-md"
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-3 rounded-xl font-bold transition duration-300 shadow-md"
        >
          Add
        </button>
      </form>

      <div className="max-h-[470px] min-h-[470px]">
        <ul className="max-w-xl mx-auto space-y-4 overflow-y-auto max-h-[470px] min-h-[470px] pr-2 custom-scroll">
          {todos.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-[#0f172a] border border-cyan-700 rounded-xl p-4 shadow-md hover:shadow-cyan-600/30 transition-all"
            >
              <span className="text-xl capitalize text-cyan-200">{item}</span>
              <button className="group p-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(index)}
                  className="text-cyan-400 group-hover:text-red-500 transition-colors duration-200 text-xl"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
