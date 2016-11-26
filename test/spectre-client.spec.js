const
  SpectreClient = require('../src/index.js'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  fs = require('fs'),
  path = require('path');

chai.use(chaiAsPromised);
chai.should();

const testEndpoint = 'http://localhost:3000';

describe('SpectreClient()', function () {
  let client;

  before(() => client = SpectreClient('foo', 'bar', testEndpoint));

  it('throws an error if not passed correct params', () => {
    (function () {
      SpectreClient();
    }).should.throw(Error, /Missing parameter/);
  });

  it('should return a suite_id', () => {
    return client.should.eventually.have.property('suiteId');
  });

  it('should return a url', () => {
    return client.should.eventually.have.property('url');
  });

  it('should return a function to submit a test', () =>{
    return client.should.eventually.have.property('submitTest');
  });

  describe('submitTest()', () => {
    let
      screenShot,
      testOptions;

    before(() => {
      screenShot = fs.createReadStream(path.join(__dirname, '/support/test-card.png'));
      testOptions = {
        screenShot,
        name: 'testname',
        browser: 'testbrowser',
        size: '100'
      };
    });

    it('throws an error if not passed correct params', function () {
      return client.then((data) => {
        (function () {
          data.submitTest();
        }).should.throw(Error, /Missing parameter/);
      });
    });

    it('submits a test', () => {
      return client.then((data) => {
        data.submitTest(testOptions).should.eventually.have.property('url');
      });
    });
  });

});
