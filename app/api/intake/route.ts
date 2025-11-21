import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const webhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { ok: false, error: "missing_webhook_url" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.status < 200 || response.status >= 300) {
      return NextResponse.json(
        { ok: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}
