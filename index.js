'use strict';
const fs = require('fs');
const dataurl = require('dataurl');
const id3 = require('id3js');
const mp3Duration = require('mp3-duration');

const getSongDuration = (filePath) => {
  const durationPromise = new Promise((resolve, reject) => {
    mp3Duration(filePath, (err, duration) => {
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

const getSongTags = (track) => {
  const  { filePath }  = track;
  const tagsPromise = new Promise((resolve, reject) => {
    id3({
      file: filePath,
      type: id3.OPEN_LOCAL
    }, (err, tags) => {
      if (tags) {
        const {title, album, artist} = tags;
        Object.assign(track, {title, album, artist, track: tags.v1.track});
        resolve(track);
      }
      if (err) {
        reject(err);
      }
    });
  });
  return tagsPromise;
};

const createSongObject = (filePath) => {
  const track = {};
  return getSongDuration(filePath)
    .then((duration) => Object.assign(track, {duration, filePath}))
    .then((track) => getSongTags(track));
};

const createSongUri = (filePath, mimetype) => {
  const songPromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(dataurl.convert({data, mimetype}));
    });
  });
  return songPromise;
};

module.exports = {
  getSongDuration,
  getSongTags,
  createSongUri,
  createSongObject
};
