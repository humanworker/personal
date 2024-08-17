const { handler } = require('@netlify/functions');
const { getKVStore } = require('@netlify/functions');

const saveEntries = async (event, context) => {
  console.log("Save entries function called");

  if (event.httpMethod !== 'POST') {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const entries = JSON.parse(event.body);
    console.log("Entries to save:", entries);
    
    const store = getKVStore();
    await store.set('entries', JSON.stringify(entries));
    console.log("Entries saved successfully");

    // Verify the save by immediately retrieving
    const savedEntries = await store.get('entries');
    console.log("Retrieved after save:", savedEntries);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Entries saved successfully', entries: JSON.parse(savedEntries) }),
    };
  } catch (error) {
    console.error("Error in save-entries:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save entries', details: error.message }),
    };
  }
};

exports.handler = handler(saveEntries);