'use client'
import { Todo } from '@/types/todo';

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li key={todo.id} className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-lg">{todo.title}</h3>
          <p className="text-gray-600 mt-1">{todo.description}</p>
        </li>
      ))}
    </ul>
  );
}