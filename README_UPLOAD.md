# Ready to upload

This project is cleaned for GitHub upload.

## Before running locally
Create a `.env.local` file:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_public_mapbox_token_here
ZOHO_FLOW_WEBHOOK_URL=https://flow.zoho.com/your-webhook-url-here
```

## Before deploying
Add these environment variables in your hosting provider:

- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `ZOHO_FLOW_WEBHOOK_URL`

## What changed
- The check-in form now sends data to `/api/checkin`
- `/api/checkin` forwards the JSON payload to your Zoho Flow webhook
- Zoho Flow can then create a record in Zoho Creator

## Important
- Do not commit `.env.local`
- Use a public Mapbox token that starts with `pk.`
- Keep `ZOHO_FLOW_WEBHOOK_URL` server-side only and never expose it with `NEXT_PUBLIC_`
- If an old token was pushed before, rotate it in Mapbox
