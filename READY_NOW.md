# Ready now

This copy already includes `.env.local` configured for local running.

## Local run
```bash
npm install
npm run dev
```

## Required for live check-in forwarding
Add this variable to `.env.local` for local testing and in Vercel for deployment:

```env
ZOHO_FLOW_WEBHOOK_URL=https://flow.zoho.com/your-webhook-url-here
```

## GitHub upload
Use the separate clean package for GitHub upload so `.env.local` is not included.
