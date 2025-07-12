const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mention")
        .setDescription("Pings the user that inputed this command"),
    async execute(interaction) {
        await interaction.reply(`<@${interaction.user.id}>`);
    },
};