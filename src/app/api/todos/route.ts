import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

type Todo = {
  id: number;
  title: string;
  description: string;
};

const dbPath = path.join(process.cwd(), 'src', 'data', 'todos.json');

// Helper functions
async function readDB() {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data) as { todos: Todo[] };
}

async function writeDB(data: { todos: Todo[] }) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// GET all todos
export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.todos);
}

// POST new todo
export async function POST(request: Request) {
  const db = await readDB();
  const { title, description } = await request.json();

  const newTodo: Todo = {
    id: db.todos.length > 0 ? Math.max(...db.todos.map(t => t.id)) + 1 : 1,
    title,
    description
  };

  db.todos.push(newTodo);
  await writeDB(db);

  return NextResponse.json(newTodo, { status: 201 });
}

// PUT update todo
export async function PUT(request: Request) {
  const db = await readDB();
  const updatedTodo: Todo = await request.json();

  const index = db.todos.findIndex(t => t.id === updatedTodo.id);
  if (index === -1) {
    return NextResponse.json(
      { error: 'Todo not found' }, 
      { status: 404 }
    );
  }

  db.todos[index] = updatedTodo;
  await writeDB(db);

  return NextResponse.json(updatedTodo);
}

// DELETE todo
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const db = await readDB();

  db.todos = db.todos.filter(todo => todo.id !== id);
  await writeDB(db);

  return NextResponse.json({ success: true });
}