'use strict';

var fs = require('fs');
var dataurl = require('dataurl');
var id3 = require('id3js');
var mp3Duration = require('mp3-duration');

var getSongDuration = function getSongDuration(filePath) {
  var durationPromise = new Promise(function (resolve, reject) {
    mp3Duration(filePath, function (err, duration) {
      if (duration) {
        resolve(duration);
      }
      if (err) {
        reject(err);
      }
    });
  });
  return durationPromise;
};

var getSongTags = function getSongTags(track) {
  var filePath = track.filePath;

  var tagsPromise = new Promise(function (resolve, reject) {
    id3({
      file: filePath,
      type: id3.OPEN_LOCAL
    }, function (err, tags) {
      if (tags) {
        var title = tags.title,
            album = tags.album,
            artist = tags.artist;

        Object.assign(track, { title: title, album: album, artist: artist, track: tags.v1.track });
        resolve(track);
      }
      if (err) {
        reject(err);
      }
    });
  });
  return tagsPromise;
};

var createSongObject = function createSongObject(filePath) {
  var track = {};
  return getSongDuration(filePath).then(function (duration) {
    return Object.assign(track, { duration: duration, filePath: filePath });
  }).then(function (track) {
    return getSongTags(track);
  });
};

var createSongUri = function createSongUri(filePath, mimetype) {
  var songPromise = new Promise(function (resolve, reject) {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(dataurl.convert({ data: data, mimetype: mimetype }));
    });
  });
  return songPromise;
};

module.exports = {
  getSongDuration: getSongDuration,
  getSongTags: getSongTags,
  createSongUri: createSongUri,
  createSongObject: createSongObject
};
