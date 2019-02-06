const util = require("util");
const Discord = require("discord.js");
const config = require("./config.js");

const onMessage = require("./onMessage");
const client = new Discord.Client();
const { init, setRandomActivity } = require("./randomThings");

client.on("ready", () => {
	console.log(util.format("Logged in as %s (id %d)", client.user.username, client.user.id));
	init(client);
	setRandomActivity();
});

client.on("error", function(err) {
	console.log(err);
});

client.on("message", (msg) => onMessage(client.user, msg));

client.login(config.key);
