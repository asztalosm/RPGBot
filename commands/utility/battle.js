const { SlashCommandBuilder } = require('discord.js');
const { Users} = require('../../models/users')

// only enemy is goblin cause no time I HATE MYSELF FOR PROCRASTINATING
//this is the ugliest code of my life ever
let userdata = {}


let goblinData = {
    maxhealth: 100,
    health: 40,
    damage: 15,
    dexterity: 60,
    dodgeChance: 20 //percentage
};

let goblinRewards = {
    coins: 25,
    xp: 30
};

let fightOver = false
let hitchance = 0
function fightTurn(goblinData, characterData) {
    //turn 1: its the players so we'll calculate chances of hit and fight accordingly
    hitchance = characterData.dexterity - goblinData.dodgeChance
    if (Math.random(0, 100) <= hitchance) {
        console.log(`hit enemy for ${characterData.damage}\n Enemy health:${goblinData.health} | Character health:${characterData.currenthealth}`)
        goblinData.health -= characterData.damage
    }
    hitchance = goblinData.dexterity - characterData.dodge
    if (Math.random(0,100) <= hitchance){
        console.log(`hit character for ${goblinData.damage}\n Enemy health:${goblinData.health} | Character health:${characterData.currenthealth}`)
        characterData.currenthealth -= goblinData.damage
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('battle')
        .setDescription('Fight a goblin for i dont know, just want to make the battle system sorry for 3rd wall break'),
    async execute(interaction) {
        userdata = await Users.findOne({where: {id: interaction.user.id}})
        fightOver = false
        characterData = {
            maxhealth: userdata.characterMaxHealth,
            currenthealth: userdata.characterMaxHealth, //max health for initialization, dont want to save current health to database to heal passively and have health carry over fights
            damage: userdata.characterStrength,
            dodge: userdata.characterDodge,
            dexterity: userdata.characterDexterity
        }

        while ((characterData.currenthealth > 0 && !fightOver) ||  (goblinData.health > 0 && !fightOver) ) {
            if (characterData.currenthealth > 0 && goblinData.health > 0) {
                fightTurn(goblinData, characterData); //in an ideal situation where i had more time i would make this interaction an edit and give a detailed breakdown of what happened, too bad we live in a society...
            }
            else {
                if (characterData.currenthealth <= 0 && goblinData.health <= 0) {
                    await interaction.reply("The fight is a draw.")
                }
                else if(characterData.currenthealth <= 0) {
                    await interaction.reply("You lost against the goblin")
                }
                else {
                    await interaction.reply(`You won against the goblin, you got ${goblinRewards.coins} coins and ${goblinRewards.xp}XP`)
                }
                fightOver = true
                characterData.currenthealth = characterData.maxhealth;
                goblinData.health = goblinData.maxhealth;
            }
        }
    }
}