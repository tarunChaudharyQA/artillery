const fs = require("fs");
const apiDetails = fs.readFileSync(`./utility/apiDetails.json`, { encoding: 'utf-8' });
const apiEndpoints = JSON.parse(apiDetails);
const generateAuth = require('../utility/generateAuth.js');

var nextToken = Date.now() + 1000*60*50; //Global variable used to define time interval for generating access token

let err = new Error();
let isError = false;

module.exports = {
  setApiUrlAndToken,
  checkStatusCode,
  checkResponseLength,
}
/*
 * This utility file contains common methods which is consumed by all the test suites.
 */

async function setApiUrlAndToken(requestParams, context, next) {
  // Generate token after every 50 mins if a test case is taking longer than 50 mins to avoid 401 response code
  if (Date.now() >= nextToken)
    nextToken = await generateAuth.checkForAuth(context.vars['auth'], context.vars['environment'], nextToken);
  
  const text = fs.readFileSync("./token.txt");
  requestParams.headers.Authorization = `Bearer ${text}`
  
  //Using data from apiDetails.json file under utility folder
  context.vars = {...context.vars, ...apiEndpoints.endpoint, ...apiEndpoints.source, ...apiEndpoints.type};

  return next();
}

function checkStatusCode(url, responseCode, next){
const successCode = 200;
  if(responseCode !== successCode){
    const err = new Error();
    err.message += `Expected response code 200 but got ${responseCode} for the below request: \n &#xA; ${url} `;
    return next(err);
  }
  return next();
}

function checkResponseLength(url, response, next) {
  let responseLength = response.length;

  if(typeof(response) === 'string')
    responseLength = JSON.parse(response).length;

  if(!responseLength){
    const err = new Error(`Expected: Response should not be Empty,  Actual: Response is Empty \n &#xA; for the request  ${url}`);
    return next(err);
  }
  return next();
}
