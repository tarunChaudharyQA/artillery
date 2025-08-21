const fs = require('fs');
const program = require('commander');
const request = require('request-promise-native');

const authEnv = [
    {
      key:'dev',
      val: {
      }
    },
    {
      key:'test',
      val: {
      }
    },  
    {
      key:'staging',
      val: {
      }
    },  
  
  ];

  async function checkForAuth(auth, environment, nextTokenTime) {
    if(auth && (Date.now() >= nextTokenTime)) {
      nextTokenTime = Date.now() + 1000*60*50;

      const authParam = authEnv.filter(function(element) {
        return element.key == environment;
      });

      const token = await getTokenFromClientSecretAsync(authParam[0].val.tenant, authParam[0].val.appId, auth);
      
      fs.writeFileSync('token.txt', token);
    }
    return nextTokenTime;
  }


  async function getTokenFromClientSecretAsync(tenant, appId, secret ) {
    try {
  
        const endpoint = ``;
        const requestParams = {
            grant_type: 'client_credentials',
            client_id: appId,
            scope: `api://`,
            client_secret: secret
      };
  
      const result = await request.post(endpoint).form(requestParams);
      const parsedBody = JSON.parse(result);
      return parsedBody.access_token;
    } catch (e) {
      return null;
    }
  }

  module.exports = {
    checkForAuth
  }