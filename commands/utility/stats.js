const { SlashCommandBuilder, MessageFlags, EmbedBuilder, blockQuote, bold, italic, quote, spoiler, strikethrough, underline, subtext} = require('discord.js');
const { Users } = require('../../models/users');



module.exports= {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Displays your character's stats."),
    async execute(interaction) {
        const userdata = await Users.findOne({ where: {id: await interaction.user.id}});
        const embed = new EmbedBuilder()
            .setColor(0x22FF22)
            .setTitle(`${interaction.user.username}'s stats`)
            .addFields(
                {name: `Character name: ${userdata.characterName}`, value: `Level ${userdata.level} (${userdata.characterXP}/${userdata.levelXP}XP)`},
                {name: `${bold("❤️Max Health")}`, value: `${userdata.characterMaxHealth}`, inline:true},
                {name: `${bold("💪Strength")}`, value: `${userdata.characterStrength}`, inline:true},
                {name: `${bold("💨Dodge Chance")}`, value: `${userdata.characterDodge}`, inline:true},
                {name: `${bold("⚡Dexterity")}`, value: `${userdata.characterDexterity}`, inline:true},
                {name: `${bold("💰Coins")}`, value: `${userdata.coins}`, inline:true},
            )


        //console.log(userdata)
        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral})
    }

}