const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { Users } = require('../../models/users');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createcharacter")
        .setDescription("Creates a character in RPGBot's database")
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Creates a character with the given name')
                .setRequired(true)),

    async execute(interaction){
        const name = interaction.options.getString('name');
        const find = await Users.findOne({where: {id: await interaction.user.id}});
        if (find === null) {
        const [ users, created ] = await Users.findOrCreate({where: {id: await interaction.user.id, characterName: name}});
        await users.update({id: interaction.user.id, characterName: name, characterMaxHealth: 100, characterStrength: 10, characterDodge: 10, characterDexterity: 70, coins: 100, characterXP: 0, levelXP: 100, level: 0, skillPoints: 0});
        await interaction.reply({content:`Created character with the name: "${name}"`, flags: MessageFlags.Ephemeral});
        }
        else {
        const oldName = await Users.findOne({ where: {id: await interaction.user.id}});
        await interaction.reply({content:`You already have a character created, their name is: ${oldName.characterName}`, flags: MessageFlags.Ephemeral})
        }

    }
};