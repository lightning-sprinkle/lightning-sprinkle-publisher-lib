/**
 * Function will request a payment and returns a promise which 
 * will return the status when resolved
 * @param {String} pubkey of the publisher
 * @return {Promise|boolean} status
 */
function lightningSprinkle() {
  // return new Promise((resolve, reject) => {
  //   let statusImage = new Image();
  //   statusImage.referrerPolicy = "unsafe-url"
  //   statusImage.src = 'http://localhost:28373/request-payment'
  //   console.log(statusImage)
  // })
  init()
}

function init() {
  getStatus().then(status => {
    if (status === 'new') {
      showSupportMessage()
    } else if (status === 'accepted') {
      $('.adsbygoogle').remove()
      $('.support-message').remove()
    }
  })
}

function requestPermissionCallback(message) {
  console.log(message)
  if (message.origin === 'http://localhost:28373') {
    init()
  }
}

/**
 * Show a message indicating that there is support for Lightning Sprinkle on 
 * this website
 */
function showSupportMessage() {
  $('body').append(`
    <div class="support-message" style="position: fixed;left: 0;bottom: 0;width: 100%;background-color: #350743;color: white;text-align: left;padding: 0.5em">
      <div style="float:left;">${window.location.hostname} supports Lightning Sprinkle</div>
      <div style="float:right;">
        <button style="border:none; color: black; background-color: white; padding: 0.3em;" onclick="requestPermission()">set preferences</button>
      </div>
    </div>
  `)
}

/**
 * Show an iframe where we can whitelist this domain.
 */
function requestPermission() {
  return new Promise((resolve, reject) => {
    window.addEventListener("message", requestPermissionCallback)
    const y = window.top.outerHeight / 2 + window.top.screenY - ( 500 / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - ( 400 / 2);
    return window.open('http://localhost:28373/request-permission', 'Lightning-Sprinkle', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, noreferrer=no, width='+400+', height='+500+', top='+y+', left='+x);
  })
}

/**
 * Check if lightningSprinkle is running and if this domain 
 * has been approved by the user.
 * @return {Promise:String} status
 */
function getStatus() {
  return new Promise((resolve, reject) => {
    let statusImage = new Image();
    statusImage.referrerPolicy = "unsafe-url"
    statusImage.src = 'http://localhost:28373/status?' + Math.random()
    statusImage.decode()
    .then(() => {
      if (statusImage.width === 1) {
        resolve('new')
      } else if (statusImage.width === 2) {
        resolve('accepted')
      } else if (statusImage.width === 3) {
        resolve('rejected')
      }
    })
    .catch((encodingError) => {
      resolve('offline')
    })
  })
}

