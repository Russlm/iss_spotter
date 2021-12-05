const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
// LEARNING CODE. THIS CODE REPORTS THE IP ETC
/*  const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json',(error, response, body) => {
  console.error('error:', error);
  console.log('Status Code', response && response.statusCode);
  let x = JSON.parse(body);
  console.log('IP', x.ip);
  }); */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json',(error, response, body) => {
    console.error('error:', error);
    console.log('Status Code:', response && response.statusCode);
    let parsedBody = JSON.parse(body);
    console.log('IP', parsedBody.ip);

    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, parsedBody.ip);
  });
  return;
};

module.exports = { fetchMyIP };