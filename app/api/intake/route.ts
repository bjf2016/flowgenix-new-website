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

    let response: Response;

    try {
      response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      // <-- network / TLS errors land here
      console.error('Fetch to n8n failed:', err);
      return NextResponse.json(
        {
          ok: false,
          error: 'fetch_failed',
          message: err?.message || 'Unknown fetch error',
        },
        { status: 500 }
      );
    }

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
  } catch (error: any) {
    console.error('Intake API error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'server_error',
        message: error?.message || 'Unexpected error in /api/intake',
      },
      { status: 500 }
    );
  }
}
