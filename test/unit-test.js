var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;

const h5 = require('../index')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('test bundle', function() {
  it('should work', function() {
    assert.equal();
  });
});

describe('file conversion process', function() {
  it('should get the song\'s duration', function(done) {
   assert.eventually.equal(Promise.resolve(h5.getSongDuration('/Users/bcg/Desktop/Tracks/Salute.mp3')), 168.098, "This had better be true, eventually").notify(done);
  });


});
