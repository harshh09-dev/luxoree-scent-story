export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Something interrupted the moment — Luxoree</title>
  <style>
    :root { color-scheme: dark; }
    html, body { margin: 0; height: 100%; background: #0A0A0A; color: #F5F1E8; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
    .wrap { display: flex; min-height: 100dvh; align-items: center; justify-content: center; padding: 24px; }
    .card { max-width: 480px; text-align: center; }
    h1 { font-size: 28px; font-weight: 500; margin: 0 0 12px; letter-spacing: -0.01em; }
    p { color: rgba(245,241,232,0.6); margin: 0 0 24px; font-size: 14px; }
    a { display: inline-block; padding: 12px 24px; background: #C9A961; color: #0A0A0A; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; border-radius: 2px; }
    a:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Something interrupted the moment</h1>
      <p>Please try again in a moment, or return home.</p>
      <a href="/">Return home</a>
    </div>
  </div>
</body>
</html>`;
}
