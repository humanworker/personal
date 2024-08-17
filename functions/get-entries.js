const { getStore } = require("@netlify/functions");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const store = getStore();

  try {
    const entriesString = await store.get('entries');
    const entries = entriesString ? JSON.parse(entriesString) : [];

    return {
      statusCode: 200,
      body: JSON.stringify(entries),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve entries' }),
    };
  }
};