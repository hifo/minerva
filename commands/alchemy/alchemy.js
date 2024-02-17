const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alchemy')
		.setDescription('Given the circle to learn alchemy in, return the amount of alchemy points gained')
        .addStringOption(option =>
			option.setName('input')
				.setDescription('The circle to calculate based on')
				.setRequired(true)),
	async execute(interaction) {
        let circle = parseInt(interaction.options.getString('input'));


		let alchemy = [1,2,4,6,8,10];

		interaction.reply({}).catch(error => {
			if(circle < 1 || circle > 6){
				interaction.reply({ content: `${input} is an invalid circle. Please try again` });
			} else{
				interaction.reply({ content: `The number of alchemy points gained from learning it in the ${circle} circle is ${alchemy[circle-1]}` });
			}
		});
	},
};