'use client'
import { useState } from 'react';
import { Todo } from '@/types/todo';
import { updateTodo, deleteTodo } from '@/lib/api';

export default function TodoItem({ todo, onUpdate, onDelete }: {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(todo);

  const handleSave = async () => {
    try {
      const updated = await updateTodo(editData);
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <li className="p-4 bg-white rounded-lg shadow mb-3">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}