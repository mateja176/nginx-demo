Bun.serve({
  port: 3000,
  fetch: (req) => {
    const name = new URL(req.url).searchParams.get('name');
    return new Response(`Hello${name ? ' '.concat(name) : ''}!`);
  },
});
