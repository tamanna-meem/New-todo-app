import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { serialize } from "cookie";

const filePath = path.join(process.cwd(),"src" , "data", "users.json");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const rawData = await readFile(filePath, "utf-8");
    const users = JSON.parse(rawData);

    const matchedUser = users.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (user: any) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { id, name } = matchedUser;

    const cookie = serialize(
      "user",
      JSON.stringify({ id, name, email }),
      {
        httpOnly: false, // change to true in production
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      }
    );

    const response = NextResponse.json({
      message: "Login successful",
      user: { id, name, email },
    });

    response.headers.set("Set-Cookie", cookie);

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("🔥 LOGIN ERROR:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
