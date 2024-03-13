//Following discordjs.guide
//Establishes requirements/base stuff? idk
const dotenv = require('dotenv');
dotenv.config();
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.TOKEN;
const fs = require('fs');
const path = require('path');

//Creates a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,  GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

//Imports files and creates list, removing blank end space created by nano.
const sonaTalk = fs.readFileSync('../txt/sonaQuotes.txt', 'utf-8').split(/\r?\n/);
const sonaURL = fs.readFileSync('../txt/sonaGIF.txt', 'utf-8').split(/\r?\n/);
sonaTalk.pop();
sonaURL.pop();

//Creates a writing stream to add Sona quotes to a file. 
const writer = fs.createWriteStream('../txt/sonaQuotes.txt', { flags: 'a' });
const gifwrite = fs.createWriteStream('../txt/sonaGIf.txt', { flags: 'a' });

//fetches list of commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); //< tells node.js/discord.js what the current working dir is
const commandFolders = fs.readdirSync(foldersPath);   //< Creates an array of all current file names within the passed dir.
//Assuming this grabs all of the folders of the commands within the commands dir,
//like utility.

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        //Creates a new item in the command collection with the key as the command name and the value as the exported module.
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required data or execute property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file=> file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// client.on(Events.InteractionCreate, async (interaction) => {
//     if (!interaction.isChatInputCommand()) return;
    
//     const command = interaction.client.commands.get(interaction.commandName); 

//     if(!command) {
//         console.error(`No command matching ${interaction.commandName} was found.`);
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (e) {
//         console.error(e);
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
//         } else {
//             await interaction.reply({content: 'There was an error while handling this command!', ephemeral: true});
//         }
//     }
// });

// client.on(Events.MessageCreate, async message => {
//     console.log(message.author.username + ' sent the message "' + message.content + '"');
//     if (message.author.id !== '1198505072691269652') { //prevents bot from interacting with own messages
//         if (message.content.toLowerCase().includes('sona') || message.content.toLowerCase().includes('diplo') || message.author.id === '367853307097513996') { //Does not reply if the sender is itself
//             const quotes = fs.readFileSync('../txt/sonaQuotes.txt', 'utf-8').split(/\r?\n/); //fetches list of quotes
//             if (Math.floor(Math.random() * 4) + 1 !== 1) {
//                 const randomMessage = quotes[Math.round(Math.random() * (parseInt(quotes.length) - 1))];
//                 if (randomMessage && randomMessage.trim() !== '') {
//                     await message.reply(randomMessage);
//                 }
//             } else {
//                 const gifs = fs.readFileSync('../txt/sonaGIF.txt', 'utf-8').split(/\r?\n/); //fetches list of image/gif URLs
//                 const randomGIF = gifs[Math.round(Math.random() * (parseInt(gifs.length) - 1))];
//                 if (randomGIF && randomGIF.trim() !== '') {
//                     await message.reply(randomGIF);
//                 }
//             }
//         }
//         //I am unsure why I made this a switch-case statement
//         switch (true) {
//             case message.content.toLowerCase().trim().startsWith('$addquote'):
//                 if (message.content.replace(/\$addquote/ig, '').trim() !== '') {
//                     let sonaStr = message.content.replace(/\$addquote/ig, '').replaceAll("'", "").replaceAll('"', '').replaceAll('/', '').trim();
//                     writer.write(sonaStr + '\n');
//                     message.reply(message.author.username + ' added the quote "' + sonaStr + '"');
//                 }
//                 break;
//             case message.content.toLowerCase().trim() === '$listquote' || message.content.toLowerCase().trim() === '$listquotes':
//                 message.reply(fs.readFileSync('../txt/sonaQuotes.txt', 'utf-8'));
//                 break;
//             case '$addgif':
//             case message.content.toLowerCase().trim().startsWith('$addgif'):
//                 if (message.content.replace(/\$addgif/ig, '').trim() !== '') {
//                     let sonaStr = message.content.replace(/\$addgif/ig, '').replaceAll("'", "").replaceAll('"', '').trim();
//                     writer.write(sonaStr + '\n');
//                     console.log(`just wrote: ${sonaStr} from ${message.author.id}`);
//                 }
//                 break;
//                 break;
//             case message.content.toLowerCase().trim().startsWith('$listgif'):
//                 message.reply(fs.readFileSync('../txt/sonaGIF.txt', 'utf-8'));
//                 break;
//             default:
//                 break;
//         }

//         if (message.author.id === '367853307097513996' && message.content.toLowerCase().trim().replace(/\$removequote/ig, '$removequote').startsWith('$removequote')) {
//             const quoteToRemove = message.content.replace(/\$removequote/ig, '').trim();
//             const quotes = fs.readFileSync('../txt/sonaQuotes.txt', 'utf-8').split(/\r?\n/);

//             const updatedQuotes = quotes.filter(quote => quote.trim() !== quoteToRemove);

//             fs.writeFileSync('../txt/sonaQuotes.txt', updatedQuotes.join('\n'));

//             await message.reply(`Quote "${quoteToRemove}" removed successfully.`);
//         } else if (message.content.toLowerCase().trim().replace(/\$removequote/ig, '$removequote').startsWith('$removequote')) {
//             message.reply("You don't have permission to do this.");
//         }

//         if (message.content.toLowerCase().trim().startsWith('$help')) {
//             message.reply("$addquote <QUOTE> to add a quote \n $listquotes to see all current quotes \n $addgif <URL> to add a gif \n $removequote <KEYWORD> to remove a quote if you're sona");
//         }
//     }
// });


client.login(token); //Logs in with API key