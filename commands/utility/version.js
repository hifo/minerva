const { SlashCommandBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiurl = 'https://antioch-production.up.railway.app/antioch/api/v1.0/version';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription('Replies with omnibus version'),
	async execute(interaction) {
        let version = await fetch(`${apiurl}`).then(response => response.json());
        console.log(version);
		await interaction.reply(`This version of Minerva is using the ${version['version']}`);
	},
};