const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiurl = 'https://antioch-production.up.railway.app/antioch/api/v1.0/spell/';

function formatName(name){
	let words = name.split(" ");
	let spell = "";
	for (let i=0; i< words.length; i++){
		words[i] = words[i][0].toUpperCase() + words[i].substring(1);
		spell = spell + " " + words[i];
	}

	return spell;
}

function parseNull(string){
	if(string == null){
		return "None";
	}
	else {
		return string;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spell')
		.setDescription('Given the name of a spell, responds with the spell information')
        .addStringOption(option =>
			option.setName('input')
				.setDescription('The spell to look up')
				.setRequired(true)),
	async execute(interaction) {
        let string = interaction.options.getString('input').toLowerCase();
        console.log(string);
        let spell = await fetch(`${apiurl}${string}`).then(response => response.json());
        console.log(spell);
		
        const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle(formatName(string))
			.addFields(
				{
					name: 'Circle', value: `${spell["spells"]['circle']}`, inline: true,
				},
                {
					name: 'Uses', value: `${spell["spells"]['uses']}`, inline: true,
				},
                {
                    name: 'verbal', value: `${parseNull(spell["spells"]['verbal'])}`, inline: true,
                },
				{
                    name: 'Caveats', value: `${parseNull(spell["spells"]['caveats'])}`, inline: true,
                },
                {
                    name: 'Active', value: `${parseNull(spell["spells"]['active'])}`, inline: true,
                },
                {
                    name: 'Material', value: `${parseNull(spell["spells"]['material'])}`, inline: true,
                },
			)
			.setDescription(spell['spells']['description'] || spell['spells']['link'])
			.setTimestamp();


		interaction.reply({ embeds: [exampleEmbed] }).catch(error => {
			console.log(error);
			interaction.reply({ content: `I didn't recognize your input (${string}). Be sure the spell you're requesting is from the Realm Omnibus` });
		});
	},
};