const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { Users } = require('../../models/users');



module.exports = {
    data: new SlashCommandBuilder()
        .setName("deletecharacter")
        .setDescription("PERMANENTLY deletes your character")
        .addStringOption(option => 
            option
                .setName("name")
                .setDescription("Confirm your character's name to delete it.")
                .setRequired(true)),

    async execute(interaction) {
        const input = interaction.options.getString('name');
        const userdata = await Users.findOne({where: {id: await interaction.user.id}})
        if (input === userdata.characterName) {
            interaction.reply({content:`Successfully deleted ${userdata.characterName}`, flags: MessageFlags.Ephemeral})
            userdata.destroy()
        }
        else {
            interaction.reply({content:`Incorrect name entered, ${userdata.characterName} has not been deleted`, flags: MessageFlags.Ephemeral})
        }
    }
}