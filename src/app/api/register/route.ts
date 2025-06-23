import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), 'src', "data", "users.json");


export async function POST(req: NextRequest) {
  const body = await req.json();

  const usersRaw = await readFile(filePath, "utf-8");
  const users = JSON.parse(usersRaw);

  // Check for duplicate email
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userExists = users.some((user: any) => user.email === body.email);
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = {
    id: Date.now(), // or use uuid
    ...body,
  };
  
  users.push(newUser);
  await writeFile(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: "Registered successfully" });
}
