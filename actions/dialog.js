var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const getParameters = async (msg) => {
  let type = localStorage.getItem("testType");
  let version = localStorage.getItem("testVersion");
  let env = localStorage.getItem("testEnv");
  let baseURL = localStorage.getItem("baseURL");

  //get the message
  const message = msg.content;
  //split the message
  console.log("message: " + JSON.stringify(msg));
  const splitMessage = message.split(" ");
  //get the command
  const command = splitMessage[1];
  cmd = command.toUpperCase();
  //check if command is present
  if (command === "start") {
    await msg.channel.createMessage(
      "Which test type do you want to start?\nSMOKE / REGRESSION / SANITY"
    );
  }

  if ("SMOKE / REGRESSION / SANITY".includes(cmd)) {
    type = cmd;
    localStorage.setItem("testType", type);
    await msg.channel.createMessage(
      "Which version do you want to test?\n22.40  |  21.50"
    );
  }

  if ("22.40  |  21.50".includes(cmd)) {
    version = cmd;
    localStorage.setItem("testVersion", version);
    await msg.channel.createMessage(
      "Which environment do you want to test?\nPROD  |  QA"
    );
  }

  if ("PROD  |  QA".includes(cmd)) {
    env = cmd;
    localStorage.setItem("testEnv", env);
  }

  if (cmd == "PROD") {
    await msg.channel.createMessage(
      "You have selected PROD environment.\n Please provide the base URL: "
    );
  }

  var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  var urlParam = message.split(" ")[1];
  if (httpRegex.test(urlParam)) {
    baseURL = urlParam;
    localStorage.setItem("baseURL", baseURL);
  }

  // set url parameters
  if (env == "PROD") {
    urlParam = "&testType=" + type + "&tsVersion=" + version + "&testEnvironment=" + env + "&tenantBaseUri=" + baseURL;}
  else {
    urlParam = "&testType=" + type + "&tsVersion=" + version + "&testEnvironment=" + env;
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
