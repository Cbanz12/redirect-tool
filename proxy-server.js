const express = require('express');
const request = require('request-promise'); // Use this for making HTTP requests
const app = express();
const PORT = 4000;

// Serve the index.html
app.use(express.static('public'));

// Proxy request handler
app.get('/proxy', async (req, res) => {
  let targetUrl = req.query.url; // URL from query parameters
  
  if (!targetUrl) {
    return res.status(400).send('No URL provided!');
  }

  // Automatically add 'http://' if the protocol is missing
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'http://' + targetUrl; // Default to http://
  }

  try {
    // Try to fetch the content from the target URL
    const response = await request(targetUrl);
    res.send(response);
  } catch (error) {
    console.error('Error while fetching the URL:', error.message);
    res.status(500).send('An error occurred while fetching the website.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
