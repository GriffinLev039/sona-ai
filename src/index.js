require('dotenv').config();
const superagent = require('superagent');
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessagePayload } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let name = 'you';
const sonaSpeak = ['', 'I did nothing wrong', 'have you ever [blank] before', 'bitch', 'ur mom', 'u hate me. ', 'im in ur house', '9/11 was bad.', 'smile', `I hate ${name}`, 'kys', 'marou', 'whats ur opinion on... opinions?', 'ʖ╎ℸ ̣ ᓵ⍑ ⎓⚍ᓵꖌ ||𝙹⚍', 'wow, I cant believe you would ping me', 'help me jiggs has me trapped im not a bot im the real sona', 'murd', 'murder', 'I would never', '*thing* bad', ''];
const gifList = ['https://tenor.com/view/neekeri-kissa-funny-cat-wheelchair-gif-17334150', 'https://images-ext-2.discordapp.net/external/eebCz85VE9iCV_YAHoEVYyNUEgkmQ-FLIqLdz49CJXk/https/media.tenor.com/TdztxGsIY9gAAAPo/ferocious.mp4', 'https://media.discordapp.net/attachments/1049416197520756858/1049417646564704346/espoooooooooortsuu-1.gif?ex=65b80658&is=65a59158&hm=8d8c6b05b5c65e123e0b3f6f693bf8113ee3f069365954116d3a074a0248a791&=&width=121&height=433', 'https://images-ext-1.discordapp.net/external/4GsUkSp1u5IpdS-LE7-UJFArYQ8XMadvtG0g30reItw/https/media.tenor.com/RA9tzdRklEcAAAPo/pancake-cat.mp4', 'https://media.discordapp.net/attachments/810010753251278899/1152538254520877136/image0_4.gif?ex=65be08e5&is=65ab93e5&hm=e7e3d14abb545233cd87bf76e37d7b7783716abd9439e6ced38aa05b67850b3a&=&width=671&height=359', 'https://images-ext-2.discordapp.net/external/m_wXLwP3X0romNMa-Qf9z2agHOjeWqOGF7iYa2DEdkg/https/media.tenor.com/Ovt90ZKF324AAAPo/blacrswan.mp4', 'https://images-ext-1.discordapp.net/external/5GL73SzSggKy4bAmhLHM5Ppl-6UZLGQEEn3GGsU7SpU/https/media.tenor.com/sRODQbAd4DcAAAPo/boobs-cat-big-boobs.mp4', 'https://media.discordapp.net/attachments/807809192537882647/1130656366072168588/20230531_092326.jpg?ex=65b841cc&is=65a5cccc&hm=16f8630ba8fe46800dc6fcb72d5b5cb7fe139ac42fb6fb7242c5a9cf82c9be4c&=&format=webp&width=471&height=629', 'https://media.discordapp.net/attachments/807809192537882647/1130149170297176074/image0.png?ex=65b6696f&is=65a3f46f&hm=bd6c7f4f63fee37f86c8ef4883f7cc1ad158a13dd474df699a0cb2d808fc91c1&=&format=webp&quality=lossless&width=325&height=323', 'https://media.discordapp.net/attachments/807809192537882647/1129929490131337306/tumblr_f43d1fbd80ed23d6c662dcffbace8d2f_d8ef80c3_1280.jpg?ex=65bed757&is=65ac6257&hm=b58d2a3689bbc56bf7b409c359ed1819e44952314be34a52d1a72002d3732ced&=&format=webp&width=863&height=857', 'https://media.discordapp.net/attachments/807809192537882647/1127698406203199579/8867db6929fd33627bad2ee6ec3fb8a6.png?ex=65b6b97b&is=65a4447b&hm=f2038a2e49e27ef451ee86380d43acf18cf4d4f48731b7f8a34d42c4cfcca49d&=&format=webp&quality=lossless&width=419&height=802', 'https://media.discordapp.net/attachments/807809192537882647/1127111860735451166/unknown.png?ex=65bdd1b8&is=65ab5cb8&hm=b8bb2c10c76955b46a2ddc675cd757ff3e52c7b44e2385ea442a5f3aaa8f4047&=&format=webp&quality=lossless&width=647&height=383', ''];

client.on("ready", (x) => {
    console.log(`${x.user.tag} says bitch`);
    client.user.setActivity('Sona you dont see this!');
});

client.login(process.env.TOKEN);

client.on('messageCreate', async message => {
    name = `<@${message.author.id}>`;
    const rndm = Math.round(Math.random() * (parseInt(sonaSpeak.length) - 1));
    console.log(rndm);
    if (message.content.toLowerCase().includes('sona') || message.author.id === '367853307097513996' && message.author.id !== '1198505072691269652') {
        if (message.content.toLowerCase().includes('sona') && message.author.id !== '1198505072691269652' || message.author.id === '367853307097513996') {
            if (Math.floor(Math.random() * 4) + 1 !== 1) {
                const randomMessage = sonaSpeak[rndm];
                if (randomMessage && randomMessage.trim() !== '') {
                    await message.reply(randomMessage);
                }
            } else {
                const rndmGIF = Math.round(Math.random() * (parseInt(gifList.length) - 1));
                const randomGIF = gifList[rndmGIF];
                if (randomGIF && randomGIF.trim() !== '') {
                    await message.reply(randomGIF);
                }
            }
        }

    };
});