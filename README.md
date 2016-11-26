## Spectre JS client

A js rewrite of https://github.com/wearefriday/spectre_client

## Usage

  `npm install spectre-client --save`

Import when you want to use

  `var SpectreClient = require('spectre-client');`

Create a client, passing your project and suite name
  ```
let spectreInstanceUrl = https://spectre-attempt.herokuapp.com/projects
let client = SpectreClient('foo', 'bar', spectreInstanceUrl);
  ```

The connection returns a promise so you can send your screenshots once resolved

  ```
client.then((resolvedClient) => resolvedClient.submitTest(testOptions));
  ```

your testOptions should be an object

```
screenShot = fs.createReadStream('yourImage.png');
testOptions = {
  screenShot,
  name: 'string', // required
  browser: 'string', // required
  size: 'string', // required
  sourceUrl: 'string',
  fuzzLevel: 'string',
  highlightColour: 'string',
};
```

## Development

You'll need a local copy of spectre running under 0.0.0.0:3000

  * `npm install`
  * `npm run test`, write some tests and make some changes
