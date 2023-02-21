# Mini-Marvin

Look this comes with no support other than this readme, this was a little thing I whipped up to at least get item broadcasts for a little bit.

Assuming it will break when lightfall drops or even before then if I forgot to catch some error... like when the Bungie API goes down for example, absolutely no error handling for that.

Enjoy, when I get back from my wedding I'll write up a detailed dive in to how I made this, how it works and who knows maybe extend it a bit further.

## Setup

Duplicate the `config.example.json` file and drop the example, so it's just `config.json`.

Fill in the required fields.

- BungieAPIKey - Get a key here: https://www.bungie.net/en/Application
- DiscordToken - Create a discord application here: https://discord.com/developers/applications
  - Then once the application is created go to the `Bot` tab and create a bot and grab the `Token`
  - To invite the bot to your server create an invite link by clicking the `OAuth2` tab then go to URL Generator and select these 2 options
    - bot
    - applications.commands
  - Grab the URL and throw it in a browser and invite the bot to your server.
- DiscordChannelId - Grab this by turning on developer mode on discord in the settings (google it) and then right click a channel and you'll see a `Copy ID` option.
- Then finally add your clan details, clan name and clan id (you can get this from the URL on your clan page on bungie.net)

## Running

Make sure you have node installed (https://nodejs.org/en/) install the LTS version

- Open a terminal in the project location
- Install the node_modules: `npm install`
- Install ts-node globally by using `npm install ts-node -g`
- Then to run the app: `ts-node .`

## Adding items to tracking

If you want to add items to tracking, grab the collectible hashes **NOT ITEM HASHES** from items and add them to the array in `config.json`.

## Finally

That's it, that's all you get, goodluck!

\- Terrii
