/**
 * Function will request a payment and returns a promise which 
 * will return the status when resolved
 * @param {String} pubkey of the publisher
 * @return {Promise|boolean} status
 */
function lightningSprinkle() {
  return new Promise((resolve, reject) => {
    let statusImage = new Image();
    statusImage.referrerPolicy = "unsafe-url"
    statusImage.src = 'http://localhost:28373/request-payment'
    console.log(statusImage)
  })
}

/**
 * Show an iframe where we can whitelist this domain.
 */
function requestPermission() {
  return new Promise((resolve, reject) => {
    let iframe = document.createElement('iframe')
    iframe.referrerPolicy = "unsafe-url"
    iframe.src = 'http://localhost:28373/request-permission'
    iframe.style = 'position:absolute;bottom:0;left:0;width:100%;height: 2em;border:none'
    document.body.appendChild(iframe);
  })
}