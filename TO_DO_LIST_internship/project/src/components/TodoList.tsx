import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit2, Check, X } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext';

function TodoList() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const submitEdit = (id: string) => {
    if (editingText.trim()) {
      updateTodo(id, editingText.trim());
      setEditingId(null);
      setEditingText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`group p-4 rounded-lg border ${
              todo.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200'
            } hover:border-indigo-200 transition-colors`}
          >
            {editingId === todo.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button
                  onClick={() => submitEdit(todo.id)}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={cancelEditing}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-1 cursor-pointer"
                >
                  <span
                    className={`${
                      todo.completed
                        ? 'text-green-600 line-through'
                        : 'text-gray-700'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="p-1 text-indigo-600 hover:text-indigo-700"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;