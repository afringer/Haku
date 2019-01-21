const util = require("util");
const Discord = require("discord.js");
const config = require("./config.js");
const responses = require("./responses.js");
const KristenUserId = 326959353603031040;

const client = new Discord.Client();

let lastKristen = 0;

client.on("ready", () => {
	console.log(util.format("Logged in as %s (id %d)", client.user.username, client.user.id));
	setRandomActivity();
});

client.on("error", function(err) {
	console.log(err);
});

client.on("message", (msg) => {
	console.log(util.format("User %s (id: %d) wrote: %s", msg.author.username, msg.author.id, msg.content));

	// Ignore messages from ourselves and other bots to prevent spam
	if (msg.author.id === client.user.id || msg.author.bot) {
		return;
	}

	if (msg.author.id === KristenUserId) {
		lastKristen = Date.now();
	}

	let c = msg.content.toLowerCase();

	if (c.includes("kristen") || c.includes("cheesecake")) {
		msg.channel.send(randomString(responses.KristenMentions));
		return;
	}

	if (c.includes("yee")) {
		if (c.includes("haw")) {
			msg.channel.send("YEE-HAW!");
			return;
		} else {
			msg.channel.send(randomString(responses.hawList));
			return;
		}
	}

	if (c.includes("good") && c.includes("morning")) {
		if (msg.author.id === KristenUserId) {
			msg.channel.send(randomString(responses.goodMorningK));
		} else {
			msg.channel.send(randomString(responses.goodMorning, msg.author.username));
		}

		return;
	}

	if (c.includes("good") && c.includes("night")) {
		if (msg.author.id === KristenUserId) {
			msg.channel.send(randomString(responses.goodNightK));
		} else {
			msg.channel.send(randomString(responses.goodNight));
		}

		return;
	}

	if (c.includes("good") && c.includes("afternoon")) {
		if (msg.author.id === KristenUserId) {
			msg.channel.send(randomString(responses.goodAfternoonListK));
		} else {
			msg.channel.send(randomString(responses.goodAfternoonList));
		}

		return;
	}
	if (c.includes("good") && c.includes("evening")) {
		if (msg.author.id === KristenUserId) {
			msg.channel.send(randomString(responses.goodEveningListK));
		} else {
			msg.channel.send(randomString(responses.goodEveningList));
		}

		return;
	}

	if (c.includes("gourd")) {
		msg.channel.send("I have a " + randomString(responses.gourdList));
		return;
	}

	if (
		(c.includes("friends") || c.includes("friend")) &&
		(c.includes("message") || c.includes("messages")) &&
		msg.author.id === KristenUserId
	) {
		msg.channel.send(randomString(responses.freindMessages));
		return;
	}

	if (c.includes("how") && c.includes("are") && c.includes("you") && c.includes(client.user.username)) {
		let timeSinceKristen = Date.now() - lastKristen;
		let twoHours = 1000 * 60 * 60 * 2;
		if (timeSinceKristen > twoHours) {
			msg.channel.send(randomString(responses.missKristen));
		} else {
			if (msg.author.id === KristenUserId) {
				msg.channel.send(randomString(responses.doingOkK));
			} else {
				msg.channel.send(randomString(responses.doingOk));
			}
		}
		return;
	}
	if (
		c.includes("i") &&
		c.includes("love") &&
		c.includes("you") &&
		c.includes(client.user.username) &&
		msg.author.id === KristenUserId
	) {
		msg.channel.send(randomString(responses.iLoveYouToo));
		return;
	}

	if (c.includes(client.user.username) && c.includes("source")) {
		msg.channel.send("If you really have to see it, its here. Please be gentle OwO. https://github.com/afringer/Haku");
		return;
	}
});

const randomString = function(array, username = "", setActivty = true) {
	if (setActivty) setRandomActivity();

	const msg = array[Math.floor(Math.random() * array.length)];
	if (msg.includes("%s")) return util.format(msg, username);

	return msg;
};

const setRandomActivity = function() {
	const activities = responses.BotActivities;
	const entries = Object.entries(activities);
	const [type, specificActivities] = entries[Math.floor(Math.random() * entries.length)];
	client.user.setActivity(randomString(specificActivities, "", false), { type });
};

client.login(config.key);
