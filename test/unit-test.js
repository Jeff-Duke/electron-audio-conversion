const { assert, expect } = require('chai')
const fs = require('fs');
const h5 = require('../index');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const filePath = __dirname + '/Timed-Out-(Sting).mp3';

describe('file conversion process', () => {

  it('should get the song\'s duration', (done) => {
    return assert.eventually.equal(Promise.resolve(h5.getSongDuration(filePath)), 8.829, "This should return time in seconds").notify(done);
  });

  it('should return a song\'s tags', (done) => {
    //Function does not require duration, but it will present in our actual
    //function because of how we are chaining promises.
    const track = { filePath: filePath };

    expect(Promise.resolve(h5.getSongTags(track))).to.eventually.have.property('artist', 'Jingle Punks').notify(done);
  });

  it('should return a song object with a duration of 8.829', (done) => {
     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('duration', 8.829).notify(done);
  });

  it('should return a song object with an artist of Jingle Punks', (done) => {
     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('artist', 'Jingle Punks').notify(done);
  });

  it('should return a song object with an album title of Youtube Audio Library', (done) => {
     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('album', 'YouTube Audio Library').notify(done);
  });

  it('should return a song object with a track title of Timed Out (Sting)', (done) => {
     expect(Promise.resolve(h5.createSongObject(filePath))).to.eventually.have.property('title', 'Timed Out (Sting)').notify(done);
  });

  it('should create a song url by converting to a dataurl', (done) => {
    const TEST_FILE = fs.readFileSync(filePath);
    const TEST_DATAURL = `data:audio/mp3;base64,${TEST_FILE.toString('base64')}`;

    assert.eventually.equal(Promise.resolve(h5.createSongUri(filePath, 'audio/mp3')), TEST_DATAURL, "This should return the same dataurl as or TEST_DATAURL variable").notify(done);
  });
});
