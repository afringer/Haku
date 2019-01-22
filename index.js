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

	// Discord.js returns a string we need to convert to a Number
	const msgAuthorId = Number(msg.author.id);

	if (msgAuthorId === KristenUserId) {
		lastKristen = Date.now();
	}

	let c = msg.content.toLowerCase();

	if (c.includes("kristen") || c.includes("cheesecake")) {
		msg.channel.send(randomString(responses.KristenMentions));
		return;
	}
	//yee regex will look for a word that starts with at least 1 'y', followed by an 'e', followed by at least one more 'e'. It will also check to see if it is followed by a haw of any length.
	if (c.match(/\by+ee+(h+a+w+)*\b/)) {
		//haw regex will look for a word that contains at least 1 'h', followed by at least 1 'a', followed by at least 1 'w'. Also as a final check it would confirm if it is preceeded by a yee of any length.
		//note this regex also captures 'yee tomorrow haw' and 'yee the yellow belly haw' which were defined as valid yeehaw.
		if (c.match(/\b(y+ee+( |-)*)*h+a+w+\b/)) {
			msg.channel.send("YEE-HAW!");
			return;
		} else {
			msg.channel.send(randomString(responses.hawList));
			return;
		}
	}

	if (c.match(/\bgood morning\b/)) {
		if (msgAuthorId === KristenUserId) {
			msg.channel.send(randomString(responses.goodMorningK));
		} else {
			msg.channel.send(randomString(responses.goodMorning, msg.author.username));
		}

		return;
	}

	if (c.match(/\bgood night\b/)) {
		if (msgAuthorId === KristenUserId) {
			msg.channel.send(randomString(responses.goodNightK));
		} else {
			msg.channel.send(randomString(responses.goodNight));
		}

		return;
	}

	if (c.match(/\bgood afternoon\b/)) {
		if (msgAuthorId === KristenUserId) {
			msg.channel.send(randomString(responses.goodAfternoonListK));
		} else {
			msg.channel.send(randomString(responses.goodAfternoonList));
		}

		return;
	}
	if (c.match(/\bgood evening\b/)) {
		if (msgAuthorId === KristenUserId) {
			msg.channel.send(randomString(responses.goodEveningListK));
		} else {
			msg.channel.send(randomString(responses.goodEveningList));
		}

		return;
	}

	if (c.match(/\bgourd\b/)) {
		msg.channel.send("I have a " + randomString(responses.gourdList));
		return;
	}

	if (c.match(/\bfriends* messages*\b/) && msgAuthorId === KristenUserId) {
		msg.channel.send(randomString(responses.freindMessages));
		return;
	}

	if (c.match(/\bhow are you\b/) && c.includes(client.user.username)) {
		let timeSinceKristen = Date.now() - lastKristen;
		let twoHours = 1000 * 60 * 60 * 2;
		if (timeSinceKristen > twoHours) {
			msg.channel.send(randomString(responses.missKristen));
		} else {
			if (msgAuthorId === KristenUserId) {
				msg.channel.send(randomString(responses.doingOkK));
			} else {
				msg.channel.send(randomString(responses.doingOk));
			}
		}
		return;
	}
	if (c.match(/\bi love you\b/) && c.includes(client.user.username) && msgAuthorId === KristenUserId) {
		msg.channel.send(randomString(responses.iLoveYouToo));
		return;
	}

	if (c.includes(client.user.username) && c.match(/\bsource\b/)) {
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
