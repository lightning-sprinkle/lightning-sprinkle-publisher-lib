/**
 * Function will request a payment and returns a promise which 
 * will return the status when resolved
 * @param {String} pubkey of the publisher
 * @return {Promise|boolean} status
 */
function lightningSprinkle(pubkey) {
  return new Promise((resolve, reject) => {
    let statusImage = new Image();
    statusImage.src = 'http://localhost:28373/request-payment/' + pubkey
    console.log(statusImage.width)
  })
}