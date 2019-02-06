"use strict";
const onMessage = require("./onMessage");
const { init } = require("./randomThings");
const responses = require("./responses");

const KRISTEN_USER_ID = 326959353603031040;

describe("onMessage", () => {
	let message;
	let client;
	let sendSpy;
	let setActivitySpy;
	beforeEach(() => {
		sendSpy = jasmine.createSpy("send");
		setActivitySpy = jasmine.createSpy("setActivity");
		message = {
			author: {
				id: 1,
				username: "jasmine-test",
				bot: false,
			},
			channel: {
				send: sendSpy,
			},
		};
		client = {
			user: {
				setActivity: setActivitySpy,
			},
		};
		init(client);
	});

	describe("yee haws", () => {
		const testArguments = ["YEEEE", "yeee", "yyyyyyee"];
		testArguments.forEach((argument) => {
			it(`replies some form of haw for ${argument}`, () => {
				message.content = argument;
				onMessage({ id: 5, username: "test" }, message);
				const sentMessage = sendSpy.calls.argsFor(0)[0];
				expect(responses.hawList).toContain(sentMessage);
			});
		});

		const yeehawArguments = ["YEEEHHAW", "YEE HAW", "YEEE-HAW", "YEEE            HAW"];
		yeehawArguments.forEach((argument) => {
			it(`replies yee haw for "${argument}"`, () => {
				message.content = argument;
				onMessage({ id: 5, username: "test" }, message);
				const sentMessage = sendSpy.calls.argsFor(0)[0];
				expect(sentMessage).toEqual("YEE-HAW!");
			});
		});

		const NOTYEEHAWS = ["employee", "symphonyee", "payee", "yeet"];
		NOTYEEHAWS.forEach((argument) => {
			it(`does NOT say yee-haw for "${argument}"`, () => {
				message.content = argument;
				onMessage({ id: 5, username: "test" }, message);
				const sentMessage = sendSpy.calls.argsFor(0)[0];
				expect(sentMessage).not.toEqual("YEE-HAW!");
			});
		});
	});

	describe("when the author is kristen", () => {
		beforeEach(() => {
			message.author.username = "test-kristen";
			message.author.id = KRISTEN_USER_ID;
		});

		const friendMessages = [
			"show me messages from my friends",
			"messages asdfasdfasdf friends",
			"friends this doesn't matter messages",
			"friends,messages",
		];
		friendMessages.forEach((argument) => {
			it(`responds with friend messages for message "${argument}"`, () => {
				message.content = argument;
				onMessage({ id: 5, username: "test" }, message);
				const sentMessage = sendSpy.calls.argsFor(0)[0];
				expect(responses.friendMessages).toContain(sentMessage);
			});
		});
	});
});
