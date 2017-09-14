//Require modules
const http = require('http');
const https = require('https');
const api = require('./api.json');

//Print error messages
function printError(error) {
  console.error(error.message);
}

//Function to print message to console
function printMessage(location, newLocation, temperature) {
  const refactoredLocation = location.replace('_', ' ');

  //If location name argued isn't found by OpenWeatherMap
  if (refactoredLocation.toUpperCase() !== newLocation.toUpperCase()) {
    console.log(`(Location name unidentified - location provided below is the closest match found.)`);
  }

  const message = `Current temperature in ${newLocation} is ${temperature} degrees celsius`;
  console.log(message);
}

//Function to Connect/Read/Parse/Print
function get(location) {
  try {
    //Connect to the API url
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api.key}`, response => {
      if (response.statusCode === 200) {
        let body = "";

        //Read the (JSON) data
        response.on('data', data => {
          body += data.toString();
        }); // .on('data')

        //On end...
        response.on('end', () => {
          try {
            //Parse the data
            const information = JSON.parse(body);
            const tempLocation = information.name;
            const tempCelsius = information.main.temp - 273;
            const tempCelsiusRounded = tempCelsius.toFixed(1);

            //Print the data
            printMessage(location, tempLocation, tempCelsiusRounded);
          } catch (error) {
            printError(error);
          } // try catch
        }); // .on('end')
      } else {
        const message = `There was an error getting the temperature for ${location} (${response.statusCode} - ${error.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      } // if loop (response.statusCode)
    }); // .get()

    //Error response
    request.on('error', printError);

  } catch (error) {
    printError(error);
  } // try catch
} // get()

module.exports.get = get;
