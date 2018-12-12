import {
  getLatAndLng, inputAddressComparison, checkDist, errorHandler,
} from './coordinate-util';
import { sendText } from './response';

function daddyFunction() { // rename
  const message = document.querySelector('.messageBody').value;
  const number = document.querySelector('.number').value;
  const inputAddress = document.querySelector('.addressInput').value;
  const display = document.querySelector('.showData');

  const searchableAddress = inputAddress.replace(/ /g, '+');

  getLatAndLng()
    .then((currentAddress) => {
      console.log(currentAddress);
      return inputAddressComparison(currentAddress, searchableAddress);
    })
    .then(checkDist)
    .then((result) => {
      if (result) {
        console.log(result);
        console.log('You made it!!');
        sendText(message, number);
      } else {
        console.log('Not there yet...');
      }
    })
    .catch(errorHandler);
  display.innerHTML = `You want to send "${message}" to (${number}). And the address given is ${inputAddress} `;
  console.log(message, number);
}

export { daddyFunction };
