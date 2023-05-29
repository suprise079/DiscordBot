const axios = require("axios");



const startJob = (parameters) => {

  const axios = require('axios');

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://54.171.196.69:8080/job/smart-AF/buildWithParameters?token=11b1ccecc24adde313c807dd7232868b11'+parameters,
    headers: { 
      'Authorization': 'Basic YWRtaW46YWRtaW4='
    }
  };
  
  axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
};

exports.startJob = startJob;
