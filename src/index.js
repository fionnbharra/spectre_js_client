const rp = require('request-promise');
const missingParam = require('./missing-parameter');

module.exports = (projectName, suiteName, urlBase) => {
  if (missingParam(
    projectName, suiteName, urlBase
  )) throw new Error('Missing parameter');

  let runId;

  const
    submitTestOptions = (options) => {
      return {
        method: 'POST',
        uri: `${urlBase}/tests`,
        /* eslint-disable camelcase */
        formData: {
          'test[run_id]': runId,
          'test[project]': projectName,
          'test[suite]': suiteName,
          'test[name]': options.name,
          'test[browser]': options.browser,
          'test[size]': options.size,
          'test[screenshot]': options.screenShot,
          'test[source_url]': options.sourceUrl || '',
          'test[fuzz_level]': options.fuzzLevel || '',
          'test[highlight_colour]': options.highlightColour || ''
        }
        /* eslint-enable camelcase */
      };
    },

    submitTest = (options = {}) => {
      if (missingParam(
        options.screenShot,
        options.name,
        options.browser,
        options.size
      )) throw new Error('Missing parameter');

      return rp(submitTestOptions(options))
      .then((testResponse) => JSON.parse(testResponse))
      .catch((err) => new Error(err));
    },

    spectreConnection = (spectreResponse) => {
      runId = spectreResponse.id;

      return {
        suiteId: spectreResponse.suite_id,
        url: spectreResponse.url,
        submitTest
      };
    },

    connection = (connectionOptions) => {
      return rp(connectionOptions)
      .then((spectreResponse) => spectreConnection(JSON.parse(spectreResponse)))
      .catch((err) => new Error(err));
    },

    connectionOptions = {
      method: 'POST',
      uri: `${urlBase}/runs`,
      form: {
        project: projectName,
        suite: suiteName
      }
    };

  return connection(connectionOptions);
};
