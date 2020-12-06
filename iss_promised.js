const request = require('request-promise-native')

const fetchMyIP = function(){
  return request('https://api.ipify.org/?format=json')
};


// iss_promised.js: 

// ...

/* 
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

// iss_promised.js

// ...

/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipvigilante.com
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { lat, lon } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  return request(url);
};

/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };