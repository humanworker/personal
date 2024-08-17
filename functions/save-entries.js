const { getStoreItem, setStoreItem } = require("@netlify/functions/dist/function/templates/util/kv_store");

exports.handler = async (event, context) => {
  console.log("Save entries function called");

  if (event.httpMethod !== 'POST') {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const entries = JSON.parse(event.body);
    console.log("Entries to save:", entries);
    
    await setStoreItem('entries', JSON.stringify(entries));
    console.log("Entries saved successfully");

    // Verify the save by immediately retrieving
    const savedEntries = await getStoreItem('entries');
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