import React from 'react';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                TaskMaster
              </span>
            </h1>
            <p className="text-gray-600 mb-8">Organize your tasks efficiently</p>
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;