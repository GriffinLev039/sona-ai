const { Events } = require('discord.js');
const fs = require('fs');
const sonaMSGPath = '../txt/sonaQuotes.txt';
const sonaGIFPath = '../txt/sonaGIF.txt';

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        console.log(message.author.username + ' sent the message "' + message.content + '"');
        if (message.author.id !== '1198505072691269652') { //prevents bot from interacting with own messages
            if (message.content.toLowerCase().includes('sona') || message.content.toLowerCase().includes('diplo') || message.author.id === '367853307097513996') { //Does not reply if the sender is itself
                const quotes = fs.readFileSync(sonaMSGPath, 'utf-8').split(/\r?\n/); //fetches list of quotes
                if (Math.floor(Math.random() * 4) + 1 !== 1) {
                    const randomMessage = quotes[Math.round(Math.random() * (parseInt(quotes.length) - 1))];
                    if (randomMessage && randomMessage.trim() !== '') {
                        await message.reply(randomMessage);
                    }
                } else {
                    const gifs = fs.readFileSync(sonaGIFPath, 'utf-8').split(/\r?\n/); //fetches list of image/gif URLs
                    const randomGIF = gifs[Math.round(Math.random() * (parseInt(gifs.length) - 1))];
                    if (randomGIF && randomGIF.trim() !== '') {
                        await message.reply(randomGIF);
                    }
                }
            }
            //I am unsure why I made this a switch-case statement
            switch (true) {
                case message.content.toLowerCase().trim().startsWith('$addquote'):
                    if (message.content.replace(/\$addquote/ig, '').trim() !== '') {
                        let sonaStr = message.content.replace(/\$addquote/ig, '').replaceAll("'", "").replaceAll('"', '').replaceAll('/', '').trim();
                        writer.write(sonaStr + '\n');
                        message.reply(message.author.username + ' added the quote "' + sonaStr + '"');
                    }
                    break;
                case message.content.toLowerCase().trim() === '$listquote' || message.content.toLowerCase().trim() === '$listquotes':
                    message.reply(fs.readFileSync(sonaMSGPath, 'utf-8'));
                    break;
                case '$addgif':
                case message.content.toLowerCase().trim().startsWith('$addgif'):
                    if (message.content.replace(/\$addgif/ig, '').trim() !== '') {
                        let sonaStr = message.content.replace(/\$addgif/ig, '').replaceAll("'", "").replaceAll('"', '').trim();
                        writer.write(sonaStr + '\n');
                        console.log(`just wrote: ${sonaStr} from ${message.author.id}`);
                    }
                    break;
                    break;
                case message.content.toLowerCase().trim().startsWith('$listgif'):
                    message.reply(fs.readFileSync(sonaGIFPath, 'utf-8'));
                    break;
                default:
                    break;
            }
    
            if (message.author.id === '367853307097513996' && message.content.toLowerCase().trim().replace(/\$removequote/ig, '$removequote').startsWith('$removequote')) {
                const quoteToRemove = message.content.replace(/\$removequote/ig, '').trim();
                const quotes = fs.readFileSync(sonaMSGPath, 'utf-8').split(/\r?\n/);
    
                const updatedQuotes = quotes.filter(quote => quote.trim() !== quoteToRemove);
    
                fs.writeFileSync(sonaMSGPath, updatedQuotes.join('\n'));
    
                await message.reply(`Quote "${quoteToRemove}" removed successfully.`);
            } else if (message.content.toLowerCase().trim().replace(/\$removequote/ig, '$removequote').startsWith('$removequote')) {
                message.reply("You don't have permission to do this.");
            }
    
            if (message.content.toLowerCase().trim().startsWith('$help')) {
                message.reply("$addquote <QUOTE> to add a quote \n $listquotes to see all current quotes \n $addgif <URL> to add a gif \n $removequote <KEYWORD> to remove a quote if you're sona");
            }
        }
    }
}