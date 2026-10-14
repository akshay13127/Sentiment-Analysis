# SentiTweets

A small web app that scores the sentiment of text. Type a sentence and get it labeled positive, negative or neutral, or enter a keyword to pull recent tweets and score each one.

Built in 2020. Node.js, Express, the `sentiment` library, the Twitter API and vanilla JavaScript.

## How it works

Scoring uses the [`sentiment`](https://www.npmjs.com/package/sentiment) package, which is lexicon-based (AFINN-165). Every word with a known rating adds or subtracts from the total, from -5 for strongly negative words up to +5 for strongly positive ones. No model training is involved.

For each piece of text the app shows:

| Field | Meaning |
| --- | --- |
| Score | Sum of all word ratings. Above 0 is Positive, below 0 is Negative, exactly 0 is Neutral |
| Comparative | Score divided by word count, so long and short texts can be compared |

Two modes, both posting to `/home`:

- **Sentence.** `{"query": "..."}` returns the analysis for that one string.
- **Tweets.** `{"category": "keyword", "count": 1-10}` searches recent tweets for the keyword through the Twitter v1.1 `search/tweets` endpoint and returns an analysis for each.

The frontend renders the results as a table using `fetch`, over a particles.js background.

## Run it

```bash
npm install
export CONSUMER_KEY=...
export CONSUMER_SECRET=...
export ACCESS_TOKEN_KEY=...
export ACCESS_TOKEN_SECRET=...
node index.js
```

Open http://localhost:3000.

Sentence scoring works with no keys at all. Tweet search needs Twitter (now X) API credentials, and the v1.1 search endpoint is no longer on X's free tier, so that mode only works with a paid API plan.

## Files

| File | What it is |
| --- | --- |
| `index.js` | Express server, scoring and Twitter search |
| `config.js` | Reads Twitter credentials from environment variables |
| `home.html` | The page |
| `public/js/client.js` | Sends requests and renders the results table |
| `public/css/main.css` | Styles |

## Known gaps

- Lexicon scoring reads words one at a time, so it misses sarcasm and most context. "Great, another Monday" scores positive.
- The catch-all `app.get('*')` redirect is declared inside the POST handler, so it gets re-registered on every request. It belongs at the top level.
