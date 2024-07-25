// Import necessary modules from the SDK
const { ReclaimClient } = require("@reclaimprotocol/zk-fetch");

// Initialize ReclaimClient with your contract address and app secret
const client = new ReclaimClient("0x46056bf505977eDd187Bb377A90B4a108edAa931", "YOUR APP SECRET");

// Function to fetch data securely using zkFetch
async function fetchSecureData(url) {
  try {
    const publicOptions = {
      method: 'GET', // Specify 'POST' if needed
      headers: {
        accept: 'application/json, text/plain, */*'
      }
    };

    // Fetch data securely using zkFetch
    const proof = await client.zkFetch(url, publicOptions);

    // Return or handle the fetched data as needed
    return proof;
  } catch (error) {
    console.error('Error fetching secure data:', error);
    throw error;
  }
}

module.exports = {
  fetchSecureData
};
