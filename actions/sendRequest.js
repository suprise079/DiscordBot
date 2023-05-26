const axios = require("axios");



const startJob = (parameters) => {

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://54.171.196.69:8080/job/smart-AF/buildWithParameters?token=1101f54588dfe0add10952e6ece54635a0"+parameters,
      headers: {
        Authorization: "Basic c3VwcmlzZURldmVsb3BlcjphZG1pbg==",
      },
    };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.startJob = startJob;
