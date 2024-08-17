const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const entriesPath = path.join(__dirname, '..', 'entries.json');
    fs.writeFileSync(entriesPath, event.body);

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