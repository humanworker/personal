const { getStoreItem, setStoreItem } = require("@netlify/functions/dist/function/templates/util/kv_store");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const entries = JSON.parse(event.body);
    await setStoreItem('entries', JSON.stringify(entries));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Entries saved successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save entries' }),
    };
  }
};