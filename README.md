For now, a very basic Discord bot with RPG elements. In the future I plan on adding an inventory system, more in-depth battling with status effects, set bonuses, shop, player duels etc.

To use: modify config.json to run on your own guild (server), add your token to the bot according to the bare config.json file provided. Then use `node index.js` to launch the bot, this will refresh the commands. To reset the database use `node syncdb.js` This is also REQUIRED to launch before the first launch of index.js in order to create the database which the bot uses.
