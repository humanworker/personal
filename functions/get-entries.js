const { getStoreItem } = require("@netlify/functions/dist/function/templates/util/kv_store");

exports.handler = async (event, context) => {
  console.log("Get entries function called");

  if (event.httpMethod !== 'GET') {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const entriesString = await getStoreItem('entries');
    console.log("Retrieved entries string:", entriesString);

    const entries = entriesString ? JSON.parse(entriesString) : [];
    console.log("Parsed entries:", entries);

    return {
      statusCode: 200,
      body: JSON.stringify(entries),
    };
  } catch (error) {
    console.error("Error in get-entries:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve entries', details: error.message }),
    };
  }
};