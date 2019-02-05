"use strict";
let lastKristen = 0;
const KristenUserId = 326959353603031040;
const util = require("util");
const { randomString } = require("./randomThings");
const responses = require("./responses");

module.exports = ({ id, username }, msg) => {
	console.log(util.format("User %s (id: %d) wrote: %s", msg.author.username, msg.author.id, msg.content));

	// Ignore messages from ourselves and other bots to prevent spam
	if (msg.author.id === id || msg.author.bot) {
		return;
	}

	// Discord.js returns a string we need to convert to a Number
	const msgAuthorId = Number(msg.author.id);

	if (msgAuthorId === KristenUserId) {
		lastKristen = Date.now();
	}

	let c = msg.content.toLowerCase();
	let hakuUsername = username.toLowerCase();
	if (c.match(/\bkristen\b/) || c.match(/\bcheesecake\b/)) {
		msg.channel.send(randomString(responses.KristenMentions));
		return;
	}
	if (c.match(/\b(y+ee+( |-)*)*h+a+w+\b/)) {
		msg.channel.send("YEE-HAW!");
		return;
	}
	if (c.match(/\by+ee+(h+a+w+)*\b/)) {
		msg.channel.send(randomString(responses.hawList));
		return;
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

	if (c.match(/\bfriends*\b/) && c.match(/\bmessages*\b/) && msgAuthorId === KristenUserId) {
		msg.channel.send(randomString(responses.friendMessages));
		return;
	}

	if (c.match(/\bhow are you\b/) && c.includes(hakuUsername)) {
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

	if (c.match(/\bi love you\b/) && c.includes(hakuUsername) && msgAuthorId === KristenUserId) {
		msg.channel.send(randomString(responses.iLoveYouToo));
		return;
	}

	if (c.includes(hakuUsername) && c.match(/\bsource\b/)) {
		msg.channel.send("If you really have to see it, its here. Please be gentle OwO. https://github.com/afringer/Haku");
		return;
	}
};
