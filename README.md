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
value of the key should be that of Application bot token. This can
be found under: Discord Developer Portal -> Your Application -> Bot.

Depending on your environment, create a Symbolic link of `config.js`
to your dev or prod config file.

## Manual Testing

To add your bot to a private discord server, run the following URL
in your browser. Make sure you are logged into discord first.

```
https://discordapp.com/oauth2/authorize?client_id=<client id>&scope=bot&permissions=84992
```

Replace `client id` with the application client id. This is found under
Developer Portal -> Your Application -> General Information.

Once you have your environment set up, run `npm run dev` to launch the
bot.

# Auto Deploy Setup

Upon each PR request [Travis-CI](https://travis-ci.org) will run the
test suite and report back on the results.

Upon each merge request to master, Travis-CI run the same test but also
auto deploy the bot to production.

A `.travis.yml` exists at the top level directory that uses scripts
located in the `auto-deploy` folder. These include `deploy-haku.sh`
`config.sh` `run-haku.sh`.

## How to add sensitive data for auto deployment

From time to time it might be required to add sensitive data such as
ssh private keys and production API keys to the repo. All data should
follow Travis CI best practices by encrypting this data.

Due to a Travis CI limitation, their native support for encryption only
supports one file as outlined [here](https://github.com/travis-ci/travis.rb/issues/627)
To this end, the following work around is being used.


First step: create your Key and IV values -- change secret to a random
passphrase

```
$ openssl enc -aes-256-cbc -k secret -P -md sha1
```

The output of this command will produce a Salt, Key and IV value.
Suggest saving the output to a file called `prod-encryption.txt` in
the top level of this project -- file already in .gitignore. This will
allow future changes to be encrypted while saving the salt, key and
IV values but not checking them in. If for these values are lost, then
so is the data. **REMEMBER TO SAVE SALT, KEY AND IV VALUES**

From the command line, login to travis and run the following command:

You can install the
[travis command line](https://github.com/travis-ci/travis.rb#readme) or
enter the values via the Travis-CI website for the specific project.

```
$ travis env set ENC_KEY key_value -p
$ travis env set ENC_IV iv_value -p
```

Replace `ENC_KEY` and `ENC_IV` with the correct values. Then run the
following command to encrypt the files:

```
$ openssl aes-256-cbc -K ENC_KEY -iv ENC_IV -in file-unencrypted.txt -out file-encrypted.txt.enc
```

Within `.travis.yml` file add the line when required for the correct
build phase:

```
- openssl aes-256-cbc -K $ENC_KEY -iv $ENC_IV -in file-encrypted.txt.enc -out file-unencrypted.txt -d
```

** DO NOT CHECK IN YOUR UNENCRYPTED FILE **
