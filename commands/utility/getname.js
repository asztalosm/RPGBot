const { SlashCommandBuilder } = require ('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getname")
        .setDescription("Responds with the activating user's name"),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username} gdkfgjdslfkgj`);
    },
};  