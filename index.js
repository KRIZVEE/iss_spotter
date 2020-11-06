const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP} = require('./iss.js')
// const {ip} = require('./iss.js')

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