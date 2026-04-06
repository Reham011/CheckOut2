const buildErrorResponse = (error: string, status: number, details?: string) =>
  Response.json(
    {
      ok: false,
      error,
      ...(details ? { details } : {}),
    },
    { status }
  );

const getWebhookUrl = () => {
  return (
    process.env.ZOHO_FLOW_WEBHOOK_URL ||
    process.env.CHECKIN_ZOHO_FLOW_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_ZOHO_FLOW_WEBHOOK_URL ||
    ''
  ).trim();
};

export async function POST(request: Request) {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    return buildErrorResponse(
      'Missing Zoho Flow webhook URL',
      500,
      'Set ZOHO_FLOW_WEBHOOK_URL in Vercel. Fallbacks supported: CHECKIN_ZOHO_FLOW_WEBHOOK_URL or NEXT_PUBLIC_ZOHO_FLOW_WEBHOOK_URL.'
    );
  }

  try {
    const payload = await request.json();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const upstreamResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const responseText = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      return buildErrorResponse('Zoho Flow request failed', 502, responseText || 'No response body returned');
    }

    return Response.json({
      ok: true,
      forwarded: true,
      response: responseText || 'Success',
    });
  } catch (error) {
    console.error('[API /api/checkin]', error);

    if (error instanceof Error && error.name === 'AbortError') {
      return buildErrorResponse('Zoho Flow request timed out', 504);
    }

    return buildErrorResponse('Invalid request payload', 400);
  }
}
