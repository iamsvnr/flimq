const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const handler = async (event) => {
  const params = event.queryStringParameters || {};
  const { endpoint, ...rest } = params;

  if (!endpoint) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing endpoint parameter' }) };
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...rest,
  });

  const url = `${BASE_URL}${endpoint}?${searchParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify(data) };
    }

    return {
      statusCode: 200,
      headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=300', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch from TMDB' }) };
  }
};
