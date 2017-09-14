//Required modules
const weather = require('./weather.js');

//Captures all users argued to node when calling this file
const location = process.argv.slice(2).join('_');

//Runs 'get' function in 'weather.js'
weather.get(location);
