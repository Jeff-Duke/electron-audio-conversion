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

  it('should return a song\'s tags', (done) => {
    //does not require duration, but will have it in our actual function because
    //of how we are chainging promises
    const track = { filePath: '/Users/bcg/Desktop/Tracks/Salute.mp3' }

    expect(Promise.resolve(h5.getSongTags(track))).to.eventually.have.property('artist').notify(done)
  });

  it('should return a song object', (done) => {
     expect(Promise.resolve(h5.createSongObject('/Users/bcg/Desktop/Tracks/Salute.mp3'))).to.eventually.have.property('duration', 168.098)

     expect(Promise.resolve(h5.createSongObject('/Users/bcg/Desktop/Tracks/Salute.mp3'))).to.eventually.have.property('artist', 'Future')

     expect(Promise.resolve(h5.createSongObject('/Users/bcg/Desktop/Tracks/Salute.mp3'))).to.eventually.have.property('album', 'Purple Reign')

     expect(Promise.resolve(h5.createSongObject('/Users/bcg/Desktop/Tracks/Salute.mp3'))).to.eventually.have.property('title', 'Salute\u0000').notify(done)
  });

});
