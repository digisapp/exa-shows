import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Sync user to our database
      const db = getDb();
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, data.user.id))
        .limit(1);

      if (existingUser.length === 0) {
        // Create user in our database
        await db.insert(users).values({
          id: data.user.id,
          email: data.user.email || "",
          displayName:
            data.user.user_metadata?.display_name ||
            data.user.email?.split("@")[0] ||
            "User",
          role: "viewer",
        });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to home page if something goes wrong
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
