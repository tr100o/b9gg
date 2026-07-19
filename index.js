const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.js');

const client = new Client({
    intents: 3276799
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Map();
client.config = config;

const DataManager = require('./modules/dataManager.js');
client.dataManager = new DataManager(config);
client.dataManager.loadAll();

client.voiceManager = require('./modules/voiceManager.js');
client.cloneManager = require('./modules/cloneManager.js');
client.oauthManager = require('./modules/oauthManager.js');

require('./handlers/events.js')(client);
require('./handlers/commands.js')(client);

process.on('unhandledRejection', (reason) => {
    console.log(' [antiCrash] :: Unhandled Rejection');
    console.log(reason);
});

process.on('uncaughtException', (err) => {
    console.log(' [antiCrash] :: Uncaught Exception');
    console.log(err);
});

client.login(config.token);

module.exports = client;