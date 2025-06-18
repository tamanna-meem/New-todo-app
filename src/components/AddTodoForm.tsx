'use client'
import { useState } from 'react';
import { createTodo } from '@/lib/api';

export default function AddTodoForm({ 
  onAdd 
}: {
  onAdd: (todo: Todo) => void
}) {
  const [form, setForm] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    try {
      const newTodo = await createTodo(form);
      onAdd(newTodo);
      setForm({ title: '', description: '' }); // Clear form
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({...form, title: e.target.value})}
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({...form, description: e.target.value})}
        placeholder="Description"
        className="w-full p-2 border rounded"
        rows={3}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
}