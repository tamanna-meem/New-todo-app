import path from 'path';
import { promises as fs } from 'fs';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export const readDB = async () => {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
};

export const writeDB = async (data: any) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};
