const { SlashCommandBuilder } = require('discord.js');

function convert(circle){
	switch(circle){
		case 1: 
			return "first";
		case 2:
			return "second";
		case 3:
			return "third";
		case 4:
			return "fourth";
		case 5:
			return "fifth";
		case 6:
			return "sixth";
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alchemy')
		.setDescription('Given the circle to learn alchemy in, return the amount of alchemy points gained'),
	async execute(interaction) {
        let circle = parseInt(interaction.options.getString('input'));

		let alchemy = [1,2,4,6,8,10];

		if(circle < 1 || circle > 6){
			await interaction.reply(`${circle} is an invalid circle. Please try again`);
		} else{
			await interaction.reply(`Learning alchemy at the ${convert(circle)} circle would result in ${alchemy[circle-1]} alchemy points`);
		}
		
	},
};