import React, { useState, useEffect } from "react";
import apiService from "../../services/api";

const ToDoList = ({ user, logout }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Create a user ID from Auth0 user data
  const userId = user?.sub || user?.email;

  useEffect(() => {
    loadTasks();
  }, [userId]);

  const loadTasks = React.useCallback(async () => {
    try {
      const listsData = await apiService.getTasks(userId);
      setTodoLists(listsData);
      if (listsData.length > 0 && !selectedListId) {
        setSelectedListId(listsData[0].id);
      }
    } catch (error) {
      setError("Erro ao carregar listas");
    } finally {
      setLoading(false);
    }
  }, [userId, selectedListId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim() || !selectedListId) return;

    try {
      const selectedList = todoLists.find(list => list.id === selectedListId);
      const updatedTasks = [...(selectedList.listaDeTarefas || []), newTask.trim()];
      
      await apiService.updateTask(selectedListId, selectedList.titulo, updatedTasks);
      
      setTodoLists(todoLists.map(list => 
        list.id === selectedListId 
          ? { ...list, listaDeTarefas: updatedTasks }
          : list
      ));
      setNewTask("");
    } catch (error) {
      setError("Erro ao adicionar tarefa");
    }
  };

  const handleDeleteTask = async (listId, taskIndex) => {
    try {
      const list = todoLists.find(l => l.id === listId);
      const updatedTasks = list.listaDeTarefas.filter((_, index) => index !== taskIndex);
      
      await apiService.updateTask(listId, list.titulo, updatedTasks);
      
      setTodoLists(todoLists.map(l => 
        l.id === listId 
          ? { ...l, listaDeTarefas: updatedTasks }
          : l
      ));
    } catch (error) {
      setError("Erro ao deletar tarefa");
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await apiService.deleteTask(listId);
      setTodoLists(todoLists.filter(list => list.id !== listId));
      if (selectedListId === listId && todoLists.length > 1) {
        setSelectedListId(todoLists.find(l => l.id !== listId)?.id || null);
      }
    } catch (error) {
      setError("Erro ao deletar lista");
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    try {
      const newList = await apiService.createTask(newListTitle.trim(), [], userId);
      setTodoLists([...todoLists, newList]);
      setSelectedListId(newList.id);
      setNewListTitle("");
      setShowNewListForm(false);
    } catch (error) {
      setError("Erro ao criar lista");
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-blue-100 min-h-screen flex items-center justify-center">
        <div className="text-blue-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">To Do List</h1>
            <p className="text-blue-600">Bem-vindo, {user?.name || user?.email}!</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Sair
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowNewListForm(!showNewListForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {showNewListForm ? 'Cancelar' : 'Nova Lista'}
            </button>
          </div>

          {showNewListForm && (
            <form onSubmit={handleCreateList} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nome da nova lista..."
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Criar Lista
                </button>
              </div>
            </form>
          )}

          {todoLists.length > 0 && (
            <div>
              <select 
                value={selectedListId || ''} 
                onChange={(e) => setSelectedListId(Number(e.target.value))}
                className="w-full p-2 mb-3 border rounded-lg"
              >
                {todoLists.map(list => (
                  <option key={list.id} value={list.id}>{list.titulo}</option>
                ))}
              </select>
              
              <form onSubmit={handleAddTask}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nova tarefa..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!selectedListId}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Adicionar Tarefa
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow">
          {todoLists.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhuma lista encontrada. Crie sua primeira lista!</p>
          ) : (
            <div className="space-y-4">
              {todoLists.map((todoList) => (
                <div key={todoList.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-blue-700">{todoList.titulo}</h3>
                    <button
                      onClick={() => handleDeleteList(todoList.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Excluir Lista
                    </button>
                  </div>
                  {todoList.listaDeTarefas && todoList.listaDeTarefas.length > 0 ? (
                    <ul className="space-y-2">
                      {todoList.listaDeTarefas.map((tarefa, index) => (
                        <li key={`${todoList.id}-${index}`} className="flex items-center p-2 bg-gray-50 rounded group">
                          <input 
                            type="checkbox" 
                            className="mr-3" 
                          />
                          <span className="flex-1 text-gray-800">
                            {tarefa}
                          </span>
                          <button
                            onClick={() => handleDeleteTask(todoList.id, index)}
                            className="ml-2 px-2 py-1 bg-red-400 text-white rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhuma tarefa nesta lista</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
