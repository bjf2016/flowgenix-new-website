import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const webhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL;

    // TEMPORARY DIAGNOSIS RESPONSE
    return NextResponse.json(
      {
        ok: true,
        webhookUrl,
        body,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Intake API error (diagnostic):', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'server_error',
        message: 'Unexpected error in /api/intake (diagnostic)',
      },
      { status: 500 }
    );
  }
}
