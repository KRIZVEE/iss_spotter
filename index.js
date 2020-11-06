const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP} = require('./iss.js')
const {fetchISSFlyOverTimes} = require('./iss')
// const {ip} = require('./iss.js')
const {responseMsg} = require('./iss.js')

fetchMyIP((error, ip) => {
  if(error){
    console.log("It didn't work!", error);
    return;
  }
  console.log('it worked! Returned IP:', ip);
});

fetchCoordsByIP('135.12.143.75', (error, coords)=>{
  if(error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned Cooords : ',coords);

})

fetchISSFlyOverTimes({lat: 45.4995, lon: -73.5848}, (error, obj)=>{
  if(error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned Response : ',obj);
});

