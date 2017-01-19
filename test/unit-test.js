var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;

const h5 = require('../index')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('test bundle', () => {
  it('should work', () => {
    assert.equal();
  });
});

describe('file conversion process', () => {
  it('should get the song\'s duration', (done) => {
     assert.eventually.equal(Promise.resolve(h5.getSongDuration('/Users/bcg/Desktop/Tracks/Salute.mp3')), 168.098, "This should return time in seconds").notify(done);
  });

});
