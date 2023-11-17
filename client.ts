import https from 'https';
import querystring from 'querystring';

const host = process.env.HOST;
if (!host) {
  throw new Error('HOST environment variable is not set');
}
const name = process.env.NAME;
if (!name) {
  throw new Error('NAME environment variable is not set');
}

const request = https.request(
  {
    method: 'GET',
    host,
    path: `?${querystring.stringify({ name })}`,
    headers: {},
  },
  (response) => {
    let chunks = '';

    response.on('data', (chunk) => {
      chunks += chunk;
    });

    response.on('close', () => {
      if (response.statusCode === 200) {
        console.log(chunks);
      } else {
        console.error(response.statusCode, response.statusMessage);
      }
    });
  },
);

request.on('error', (err) => {
  console.error(err);
});

request.end();
