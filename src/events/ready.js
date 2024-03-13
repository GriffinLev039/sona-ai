const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is online! ${client.user.tag} says bitch`);
        client.user.setActivity('Sona.ai | Use $help');
    },
};