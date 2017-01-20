var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;

const fs = require('fs');
const h5 = require('../index');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const filePath = '/Users/bcg/Desktop/Tracks/Salute.mp3';

describe('file conversion process', () => {

  it('should get the song\'s duration', (done) => {
    return assert.eventually.equal(Promise.resolve(h5.getSongDuration(filePath)), 168.098, "This should return time in seconds").notify(done);
  });

  it('should return a song\'s tags', (done) => {
    //Function does not require duration, but it will present in our actual
    //function because of how we are chaining promises. 
    const track = { filePath: filePath };

    expect(Promise.resolve(h5.getSongTags(track))).to.eventually.have.property('artist', 'Future\u0000').notify(done);
  });

  it('should return a song object', (done) => {
     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('duration', 168.098);

     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('artist', 'Future');

     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('album', 'Purple Reign');

     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('title', 'Salute\u0000').notify(done);
  });

  it('should create a song url by converting to a dataurl', (done) => {
    const TEST_FILE = fs.readFileSync(filePath);
    const TEST_DATAURL = `data:audio/mp3;base64,${TEST_FILE.toString('base64')}`;

    assert.eventually.equal(Promise.resolve(h5.createSongUri(filePath, 'audio/mp3')), TEST_DATAURL, "This should return the same dataurl as or TEST_DATAURL variable").notify(done);
  });
});
