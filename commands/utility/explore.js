const { SlashCommandBuilder} = require('discord.js');
const { Users } = require('../../models/users')

//todo: a loot pool so that it's not always 50 coins that the characters get, probably along with an inventory system but have to work on battles and skills so no time :p
//todo2: change all messages to look like embeds, also would be good to not have this updateduserdata(2) variables because it looks ugly but i 

const coinreward = 50
const xpreward = 50

module.exports = {
    cooldown: 5,



    data: new SlashCommandBuilder()
        .setName('explore')
        .setDescription("Sends your character out on an exploration, has a 5 minute cooldown"),

    async execute(interaction) {
        const userdata = await Users.findOne({where: {id: await interaction.user.id}})


        await interaction.reply(`You sent ${userdata.characterName} on an adventure and they got ${coinreward} coins and ${xpreward}XP.`);
        await userdata.increment('coins', {by: coinreward})
        await userdata.increment('characterXP', {by: xpreward})
        
        const updateduserdata = await Users.findOne({where: {id: await interaction.user.id}})
        if (await updateduserdata.characterXP >= await updateduserdata.levelXP) {
            updateduserdata.decrement('characterXP', {by: updateduserdata.levelXP});
            updateduserdata.increment('levelXP', {by: Math.round(updateduserdata.levelXP*1.50-updateduserdata.levelXP)});
            updateduserdata.increment('level', {by: 1});
            const updateduserdata2 = await Users.findOne({where: {id: await interaction.user.id}})
            await interaction.followUp(`Congratulations ${interaction.user.username}, your character ${updateduserdata2.characterName} has leveled up to ${updateduserdata2.level} (${updateduserdata2.characterXP}/${updateduserdata2.levelXP}) \nYou have earned a skill point.`)
        }
    }
}