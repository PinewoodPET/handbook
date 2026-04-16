// Updates the DevForum post with the latest content from the Handbook.md file.
const { readFileSync } = require('fs');

// these need to be in repo secrets
const { DEVFORUM_API_KEY, DEVFORUM_POST_ID } = process.env;

if (!DEVFORUM_API_KEY || !DEVFORUM_POST_ID) {
  console.error('Missing env vars: DEVFORUM_API_KEY, DEVFORUM_POST_ID');
  process.exit(1);
}

let content = readFileSync('Handbook.md', 'utf8');

// replace {{ .LastUpdateDate }} with Month Day, Year
const lastUpdateDatePlaceholder = '{{ .LastUpdateDate }}';
const today = new Date();
const year = today.getFullYear();
const month = today.toLocaleString('en-US', { month: 'long' });

function getDaySuffix(day) {
  if (day > 3 && day < 21) {
    return 'th';
  }
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

const day = today.getDate();
const daySuffix = getDaySuffix(day);

// #marshalls decided to go with MM/DD/YYYY
const formattedDate = `${month} ${day}${daySuffix}, ${year}`; // "April 16th, 2026"
console.log(formattedDate);

if (!content.includes(lastUpdateDatePlaceholder)) {
  console.error(`Missing placeholder: ${lastUpdateDatePlaceholder}`);
  process.exit(1);
}

content = content.replaceAll(lastUpdateDatePlaceholder, formattedDate);
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
