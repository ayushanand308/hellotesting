require('dotenv').config();

const https = require('https');

// Load OAuth token from environment variable
const github_oauth_token = process.env.GITHUB_OAUTH_TOKEN;
const url = "https://api.github.com/repos/ayushanand308/FIGMA/issues";

const options = {
    hostname: 'api.github.com',
    path: '/repos/ayushanand308/FIGMA/issues',
    method: 'POST',
    headers: {
        'Authorization': `token ${github_oauth_token}`,
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
    }
};

const issueData = JSON.stringify({
    title: 'Issue Title',
    body: 'Detailed description of the issue.',
});

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const jsonResponse = JSON.parse(data);
            console.log('Issue created:', jsonResponse);
        } catch (error) {
            console.error('Error parsing response:', error);
            console.log('Response data:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(issueData);
req.end();
