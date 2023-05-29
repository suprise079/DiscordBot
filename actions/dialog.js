var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");



const getParameters = async (msg) => {
  // let type = ;
  // let version = localStorage.getItem("testVersion");
  // let env = localStorage.getItem("testEnv");
  // let baseURL = localStorage.getItem("baseURL");
  let params = {
    "testType": localStorage.getItem("testType"),
    "testVersion": localStorage.getItem("testVersion"),
    "testEnv": localStorage.getItem("testEnv"),
    "baseURL": localStorage.getItem("baseURL")
  }

  let storageValues = {
    "SMOKE": "testType",
    "REGRESSION": "testType",
    "SANITY": "testType",
    "22.40": "testVersion",
    "21.50": "testVersion",
    "PROD": "testEnv",
    "QA": "testEnv",
    "baseURL": "baseURL"
  }

  let options = {
    "START": "Which test type do you want to start?\nSMOKE / REGRESSION / SANITY",
    "SMOKE / REGRESSION / SANITY": "Which version do you want to test?\n22.40  |  21.50",
    "22.40  |  21.50": "Which environment do you want to test?\nPROD  |  QA",
    "PROD": "You have selected PROD environment.\n Please provide the base URL: ",
    "QA": "You have selected QA environment."

  }

  

  //get the message
  const message = msg.content;
  //split the message
  console.log("message: " + JSON.stringify(msg));
  const splitMessage = message.split(" ");
  //get the command
  const command = splitMessage[1];
  cmd = command.toUpperCase();

  //check if command is present
  for (var key in options) {
    if (key.includes(cmd)) {
      let variable = storageValues[cmd];
      params[variable] = cmd;
      localStorage.setItem(variable, cmd);
      await msg.channel.createMessage(options[key]);
    }
  }


  // set url parameters
  if (params.testEnv == "PROD") {
    urlParam = "&testType=" + params.testType + "&tsVersion=" + params.testVersion + "&testEnvironment=" + params.testEnv + "&tenantBaseUri=" + params.baseURL;}
  else {
    urlParam = "&testType=" + params.testType + "&tsVersion=" + params.testVersion + "&testEnvironment=" + params.testEnv;
  }

  return urlParam;
};

const clearParameters = () => {
  localStorage.removeItem("testType");
  localStorage.removeItem("testVersion");
  localStorage.removeItem("testEnv");
  localStorage.removeItem("baseURL");
}

exports.getParameters = getParameters;
exports.clearParameters = clearParameters;
