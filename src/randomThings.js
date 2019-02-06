"use strict";
const botActivities = require("./botActivities");
const util = require("util");
let user;

const init = (client) => {
	user = client.user;
};
const randomString = function(array, username = "", setActivity = true) {
	if (setActivity) setRandomActivity();

	const msg = array[Math.floor(Math.random() * array.length)];
	if (msg.includes("%s")) return util.format(msg, username);

	return msg;
};

const setRandomActivity = function() {
	const entries = Object.entries(botActivities);
	const [type, specificActivities] = entries[Math.floor(Math.random() * entries.length)];
	user.setActivity(randomString(specificActivities, "", false), { type });
};

module.exports = {
	init,
	randomString,
	setRandomActivity,
};
