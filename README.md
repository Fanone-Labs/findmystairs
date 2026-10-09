# Find the Stairs

Source code for the **Find the Stairs** website prototype.

The site helps people check stair and glass-elevator information for hotels,
office buildings, and condos. The current version uses sample information; it
does not yet connect to a live building-search service or permanent database.

## Run it on a computer

You need Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal (normally
`http://localhost:3000`).

## Build a production copy

```bash
npm run build
```

## Where the main website files are

- `app/page.tsx` — the main page and sample building information
- `app/globals.css` — colours, layout, and responsive styling
- `app/layout.tsx` — page title and site-wide layout
- `public/` — the staircase image and icons

## Important

- No passwords, API keys, or ChatGPT conversations are included.
- The ChatGPT Sites hosting identifier has been removed.
- The hosted ChatGPT Sites version and this copy are separate. Changes made in
  GitHub will not automatically change the currently hosted site.
- Before making the site public, add moderation, spam protection, a privacy
  policy, and a way to correct inaccurate user reports.

See [GITHUB-SETUP.md](GITHUB-SETUP.md) for simple publishing steps.
