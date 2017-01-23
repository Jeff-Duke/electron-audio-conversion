# electron-audio-conversion
A promise-based library for loading audio files into HTML5 audio.  Uses the dataurl, id3 and mp3duration libraries. 

# Installation
`npm install electron-audio-conversion`

# Usage
This library comes with 4 functions:

`getSongDuration(filePath) ` -- Takes a filepath and returns the duration of that song.

`getSongTags(track) ` -- Takes a track and returns the title, album and artist for that track.

`createSongObject(filePath) ` -- Takes a filepath, creates a new object, calls `getSongDuration` and `getSongTags` and returns a promise with a song object that has the track, title, album and artist.  

`createSongUri(filePath, mimetype) ` -- Takes a filepath and creates a dataUri for that file. This dataUri is handed over to the HTML5 audio element to play the song.

In practice you'll likely only ever need `createSongObject` and `createSongUri` but you have access to the others if you need them.

# Why?
This library makes it easier to pull audio files from the local file system and play them in the browser. We built this library to help with an Electron audio-player app and needed a way to create a playlist of song objects and then be able to make dataurl's on the fly for those songs as they're played.  
