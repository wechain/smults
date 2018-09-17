const STEEM_API = 'https://api.steemit.com';
const MAX_TAGS = 16; // 15 tags including the empty string
const MAX_POSTS = 100;
const MAX_AUTHORS = 20;
const POSTFIELDS = ['id', 'title', 'author', 'category', 'pending_payout_value', 'total_payout_value', 'net_votes', 'children', 'url', 'resteemed'];
// resteemd here is a custom property
const DEFAULTIMG = 'data:image/png;base64,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';
export {
  STEEM_API, MAX_TAGS, MAX_POSTS, MAX_AUTHORS, POSTFIELDS, DEFAULTIMG,
};
