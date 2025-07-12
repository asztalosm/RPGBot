const { SlashCommandBuilder, guild} = require ("discord.js")
/**
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pingeveryone")
        .setDescription("pings @everyone"),
    async execute(interaction){
        await interaction.reply("valal")
    },
};