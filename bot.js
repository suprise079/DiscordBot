const eris = require("eris");
const { getParameters, clearParameters } = require("./actions/dialog");
const { startJob } = require("./actions/sendRequest");


var LocalStorage = require("node-localstorage").LocalStorage,
localStorage = new LocalStorage("./scratch");

// Create a Client instance with our bot token.
const bot = new eris.Client("");

// When the bot is connected and ready, log to console.
bot.on("ready", () => {
  console.log("Connected and ready.");
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on("messageCreate", async (msg) => {
  const botWasMentioned = msg.mentions.find((mentionedUser) => mentionedUser.id === bot.user.id);
  let parameters = "";

  if (botWasMentioned) {
    //clear parameters on start 
    msg.content.includes("start") ? clearParameters() : null;

    parameters = await getParameters(msg);

    try {
      console.log("parameters: " + parameters);
      //If all parameters are present, start the test
      if (!parameters.includes("null")) {
        await msg.channel.createMessage("Starting the test...");
        startJob(parameters);
        clearParameters();
      }
    } catch (err) {
      await msg.channel.createMessage("Failed to start the test.\n"+err);
      console.warn("Failed to respond to mention.");
      console.warn(err);
      clearParameters();
    }
  }
});

bot.on("error", (err) => {
  console.warn(err);
});

bot.connect();
