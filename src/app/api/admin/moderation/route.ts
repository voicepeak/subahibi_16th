import { NextRequest, NextResponse } from "next/server";
import { isAdminPasscodeValid, supabaseAdmin } from "@/lib/supabase-admin";

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAdminPasscodeValid(request.headers.get("x-admin-passcode"))) return unauthorized();
  if (!supabaseAdmin) return NextResponse.json({ unavailable: true, messages: [], fanworks: [] });

  const [messages, fanworks, subscriptions] = await Promise.all([
    supabaseAdmin.from("messages").select("*").eq("approved", false).order("created_at", { ascending: false }),
    supabaseAdmin.from("fanworks").select("*").eq("approved", false).order("created_at", { ascending: false }),
    supabaseAdmin.from("email_subscriptions").select("id", { count: "exact", head: true }),
  ]);

  return NextResponse.json({
    unavailable: false,
    messages: messages.data ?? [],
    fanworks: fanworks.data ?? [],
    stats: {
      messages: messages.data?.length ?? 0,
      fanworks: fanworks.data?.length ?? 0,
      subscriptions: subscriptions.count ?? 0,
    },
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminPasscodeValid(request.headers.get("x-admin-passcode"))) return unauthorized();
  if (!supabaseAdmin) return NextResponse.json({ unavailable: true });

  const body = (await request.json()) as {
    type?: "messages" | "fanworks";
    id?: string;
    action?: "approve" | "reject" | "delete";
  };

  if (!body.type || !body.id || !body.action) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  if (body.action === "approve") {
    const { error } = await supabaseAdmin.from(body.type).update({ approved: true }).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabaseAdmin.from(body.type).delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

