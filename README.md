# Haku
Kristen's bot, who's source code EVERYONE needs to see.

# Development Setup

## Clone
Clone repo and run the following

```
$ npm install
```
Ignore warnings about peer dependencies.


Copy `config-sample.js` to `config-dev.js` or `config-prod.js`. The
value of the key should be that of Application bot token. Discord
Developer Portal -> Your Application -> Bot.

Depending on your environment, create a Symbolic link of `config.js`
your dev or prod config file.

## Manual Testing

To add your bot to a private discord server, run the following URL
in your browser. Make sure you are logged into discord first.

```
https://discordapp.com/oauth2/authorize?client_id=<client id>&scope=bot&permissions=84992
```

Replace `client id` with the application client id. This is found under
Developer Portal -> Your Application -> General Information.
