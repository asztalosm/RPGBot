const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../../models/users');

console.log(Users)

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
        const name = interaction.options.getString('name')
        
        const [ users, created ] = await Users.findOrCreate({where: {id: await interaction.user.id, characterName: name}})
        await users.update({id: interaction.user.id, characterName: name})

        await interaction.reply(`Created character with the name: "${name}"`)

    }
};