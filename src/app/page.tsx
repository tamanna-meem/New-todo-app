'use client'
import { useState, useEffect } from 'react';
import { fetchTodos } from '@/lib/api';
import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Todo = any;
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos).catch(console.error);
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Todo App</h1>
        
        <AddTodoForm onAdd={handleAddTodo} />
        
        <ul className="mt-6 space-y-3">
          {todos.map(todo => (
            <TodoItem 
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}