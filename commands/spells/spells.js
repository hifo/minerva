const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiurl = 'https://antioch-production.up.railway.app/antioch/api/v1.0/spell/';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spell')
		.setDescription('Given the name of a spell, responds with the spell information')
        .addStringOption(option =>
			option.setName('input')
				.setDescription('The spell to look up')
				.setRequired(true)),
	async execute(interaction) {
        let string = interaction.options.getString('input');
        console.log(string);
        let spell = await fetch(`${apiurl}${string}`).then(response => response.json());
        console.log(spell);
		
        const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle(string)
			.addFields(
				{
					name: 'Circle', value: `${spell["spells"]['circle']}`, inline: true,
				},
                {
					name: 'Uses', value: `${spell["spells"]['uses']}`, inline: true,
				},
                {
                    name: 'verbal', value: `${spell["spells"]['verbal']}`, inline: true,
                },
                {
                    name: 'Active', value: `${spell["spells"]['active']}`, inline: true,
                },
                {
                    name: 'Material', value: `${spell["spells"]['material']}`, inline: true,
                },
                {
                    name: 'Caveats', value: `${spell["spells"]['caveats']}`, inline: true,
                },
			)
			.setDescription(`${spell["spells"]['description']}`)
			.setTimestamp();


		interaction.reply({ embeds: [exampleEmbed] }).catch(error => {
			console.log(error);
			interaction.reply({ content: `I didn't recognize your input (${string}). Be sure the spell you're requesting is from the Realm Omnibus` });
		});
	},
};