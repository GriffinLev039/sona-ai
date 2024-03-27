const fs = require('fs').promises;
const { slashCommandBuilder, SlashCommandBuilder } = require('discord.js');
const PATH = '../txt/sonaBingo.txt';
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sonabingo')
        .setDescription('play sonmba bingo')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The tile to X out')),

    async execute(interaction) {
        const usedNums = [];
        //Text file containing the current sona bingo sheet. 
        

        try {
            const tiles = (await fs.readFile(PATH, "utf-8")).split('\n');
            tiles.pop();

            for (let i = 0; i < 25; i++) {
                let j = Math.floor(Math.random() * tiles.length);
    
                while (usedNums.contains(j)) {
                    j = Math.floor(Math.random() * tiles.length);
                }
                usedNums.push(j)
            }


            const input = Number.parseInt(interaction.options.getString('input'));
            await interaction.reply(`this is temporary! the coords to x out are ${tiles[input]}`);
            console.log(tiles);
        }
        catch (e) {
            console.log(`ERROR! ${e}`);
        }
    }
}