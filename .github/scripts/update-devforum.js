// Updates the DevForum post with the latest content from the Handbook.md file.
const { readFileSync } = require('fs');

// these need to be in repo secrets
const { DEVFORUM_API_KEY, DEVFORUM_POST_ID } = process.env;

if (!DEVFORUM_API_KEY || !DEVFORUM_POST_ID) {
  console.error('Missing env vars: DEVFORUM_API_KEY, DEVFORUM_POST_ID');
  process.exit(1);
}

const content = readFileSync('Handbook.md', 'utf8');

// just to double-check
if (content.length > 50000) {
  console.error(`Content too long: ${content.length}/50000 chars`);
  process.exit(1);
}

(async () => {
  const res = await fetch(`https://devforum.roblox.com/posts/${DEVFORUM_POST_ID}.json`, {
    method: 'PUT',
    headers: {
      'User-Api-Key': DEVFORUM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: { raw: content } }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed: ${res.status} ${res.statusText}\n${text}`);
    process.exit(1);
  }

  const { post } = await res.json();
  console.log(`Updated: https://devforum.roblox.com/t/${post.topic_slug}/${post.topic_id}`);
})();
