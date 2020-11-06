const request = require('request')
const url = 'https://api.ipify.org/?format=json';
// let ip = '';
let geoDet = {};
let responseMsg = []
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if ((response.statusCode !== 200)) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip)

  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function (ip, callback) {

  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return
    }

    if ((response.statusCode !== 200)) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    geoDet['lat'] = JSON.parse(body).lat;
    geoDet['lon'] = JSON.parse(body).lon
    callback(null, geoDet);

  });

}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  // console.log('coords :',coords);
  
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`,(error, response, body)=>{

    // console.log('body : ',body);
    if(error){
      console.log('there is an error', error);
      return
    }
    if(response.statusCode !== 200){
      console.log(`Response Status Code is not ${response.statusCode}`);
      return;
    }

    const responseMsg = JSON.parse(body).response;
    callback(null, responseMsg);
    // // geoDet['lat'] = JSON.parse(body).lat;
    // for(let i = 0; i < JSON.parse(body).response.length; i++){
    //   responseMsg.push(JSON.parse(body).response[i])
    //   // console.log('response Msg is : ',responseMsg);
    // }
    // callback(null, responseMsg);


  })
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, responseMsg};