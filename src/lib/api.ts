import { Todo } from '@/types/todo';

const API_BASE = '/api/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return await res.json();
};

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return await res.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(API_BASE, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return await res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(API_BASE, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete todo');
};
