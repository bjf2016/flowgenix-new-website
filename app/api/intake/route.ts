import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const webhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('N8N_INTAKE_WEBHOOK_URL is not set');
      return NextResponse.json(
        {
          ok: false,
          error: 'missing_webhook_url',
          message: 'N8N_INTAKE_WEBHOOK_URL is not configured on the server',
        },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.status < 200 || response.status >= 300) {
      const text = await response.text().catch(() => '');
      console.error('n8n webhook error:', response.status, text);

      return NextResponse.json(
        {
          ok: false,
          error: 'webhook_failed',
          status: response.status,
          body: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Intake API error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'server_error',
        message: 'Unexpected error in /api/intake',
      },
      { status: 500 }
    );
  }
}
