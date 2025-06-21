import type { APIRoute } from "astro";

export const prerender = false;

export interface WaitlistEmail {
  email: string;
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.runtime.env;
  const db = env.DB as D1Database;

  let payload: WaitlistEmail;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  const email = (payload.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email format" }), {
      status: 400,
    });
  }

  try {
    const { results } = await db
      .prepare("SELECT id FROM waitlist_emails WHERE email = ?")
      .bind(email)
      .all();
    if (results.length) {
      return new Response(
        JSON.stringify({ error: "Email already subscribed" }),
        { status: 409 }
      );
    }

    const { lastInsertRowid }: any = await db
      .prepare("INSERT INTO waitlist_emails (email) VALUES (?)")
      .bind(email)
      .run();

    return new Response(
      JSON.stringify({ success: true, id: lastInsertRowid }),
      { status: 201 }
    );
  } catch (err) {
    console.error("DB error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
