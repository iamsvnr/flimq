import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getUser(token) {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

function getToken(headers) {
  const auth = headers.authorization || headers.Authorization || '';
  return auth.replace('Bearer ', '');
}

export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    // GET - fetch all reviews for a media item (public)
    if (event.httpMethod === 'GET') {
      const { tmdb_id, media_type } = event.queryStringParameters || {};
      if (!tmdb_id || !media_type) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'tmdb_id and media_type required' }) };
      }
      const { data, error } = await supabase
        .from('user_reviews')
        .select('*')
        .eq('tmdb_id', Number(tmdb_id))
        .eq('media_type', media_type)
        .order('created_at', { ascending: false });
      if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
      return { statusCode: 200, headers, body: JSON.stringify(data || []) };
    }

    // POST - upsert a review (auth required)
    if (event.httpMethod === 'POST') {
      const user = await getUser(getToken(event.headers));
      if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };

      const { tmdb_id, media_type, content } = JSON.parse(event.body);
      if (!tmdb_id || !media_type || !content) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'tmdb_id, media_type, content required' }) };
      }

      const authorName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
      const avatarUrl = user.user_metadata?.avatar_url || '';

      const { data, error } = await supabase
        .from('user_reviews')
        .upsert(
          {
            user_id: user.id,
            tmdb_id: Number(tmdb_id),
            media_type,
            content,
            author_name: authorName,
            avatar_url: avatarUrl,
          },
          { onConflict: 'user_id,tmdb_id,media_type' }
        )
        .select()
        .single();
      if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // DELETE - remove a review (auth required)
    if (event.httpMethod === 'DELETE') {
      const user = await getUser(getToken(event.headers));
      if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };

      const { tmdb_id, media_type } = JSON.parse(event.body);
      const { error } = await supabase
        .from('user_reviews')
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', Number(tmdb_id))
        .eq('media_type', media_type);
      if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
}
