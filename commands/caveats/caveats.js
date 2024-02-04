const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiurl = 'https://antioch-production.up.railway.app/antioch/api/v1.0/caveat_by_name/';

function formatName(name){
	let words = name.split(" ");
	let spell = "";
	for (let i=0; i< words.length; i++){
		words[i] = words[i][0].toUpperCase() + words[i].substring(1);
		spell = spell + " " + words[i];
	}

	return spell;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caveats')
		.setDescription('Given the name of a caveat, responds with the caveat information')
        .addStringOption(option =>
			option.setName('input')
				.setDescription('The caveat to look up')
				.setRequired(true)),
	async execute(interaction) {
        let string = interaction.options.getString('input');
        console.log(string);
        let spell = await fetch(`${apiurl}${string}`).then(response => response.json());
        console.log(spell);
		
        const exampleEmbed = new EmbedBuilder()
			.setColor(0xbf1128)
			.setTitle(formatName(string))
			.setDescription(`${spell["caveats"]['desc']}`)
			.setTimestamp();


		interaction.reply({ embeds: [exampleEmbed] }).catch(error => {
			console.log(error);
			interaction.reply({ content: `I didn't recognize your input (${string}). Be sure the spell you're requesting is from the Realm Omnibus` });
		});
	},
};