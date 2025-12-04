import React, { useState } from "react";

const ToDoListCreator = ({ onCreateList }) => {
  const [listName, setListName] = useState("");

  const handleCreate = () => {
    if (listName.trim()) {
      onCreateList(listName.trim());
    }
  };

  return (
    <div className="p-4 bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">
          Criar Nova To Do List
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Você ainda não possui uma To Do List. Crie uma agora!
        </p>
        <input
          type="text"
          placeholder="Nome da sua To Do List"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Criar To Do List
        </button>
      </div>
    </div>
  );
};

export default ToDoListCreator;