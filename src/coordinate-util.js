import { distance } from './math-util';

function errorHandler(status) {
  console.log('Request failed with a status of', status);
}

function checkDist(mapDistance) {
  return mapDistance <= 1;
}

function getLatAndLng() {
  return new Promise(((resolve) => {
    navigator.geolocation.getCurrentPosition(resolve);
  }))
    .then((response) => {
      const presentAddress = {
        lat: response.coords.latitude,
        lng: response.coords.longitude,
      };
      // console.log(presentAddress);
      return presentAddress;
    })
    .catch(errorHandler);
}

// Google Geocoding
function addressConversion(address) {
  console.log(address);
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  return fetch(`${url}${address}&key=AIzaSyBnhjK7qWvZDZ_ccL5x7Yb8kBMm2o6CqRY`)
    .then(response => response.json()
      .then(data => ({
        objectiveLat: data.results[0].geometry.location.lat,
        objectiveLng: data.results[0].geometry.location.lng,
      })))
    .catch(errorHandler);
}

function inputAddressComparison(address1, address2) {
  return addressConversion(address2)
    .then((response) => {
      console.log(response);
      const objLat = response.objectiveLat;
      const objLng = response.objectiveLng;
      const currLat = address1.lat;
      const currLng = address1.lng;
      console.log(address1);
      return distance(objLat, objLng, currLat, currLng);
    });
}

function mapDistanceCalculation(address1, address2) {
  const objLat = address2.latitude;
  const objLng = address2.longitude;
  const currLat = address1.latitude;
  const currLng = address1.longitude;
  return distance(objLat, objLng, currLat, currLng);
}

export {
  getLatAndLng, inputAddressComparison, mapDistanceCalculation, checkDist, errorHandler,
};
