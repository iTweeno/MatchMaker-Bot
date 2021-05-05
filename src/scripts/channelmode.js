const Discord = require("discord.js");

const guildsCollection = require("../utils/schemas/guildsSchema");

const { channelMode } = require("../utils/cache");

const wrongEmbed = new Discord.MessageEmbed().setColor("#F8534F");

const correctEmbed = new Discord.MessageEmbed().setColor("#77B255");

const gamemode = ["5v5solos", "5v5teams", "3v3solos", "3v3teams"];

const execute = async (message) => {
  const secondArg = message.content.split(" ")[1];

  const a = `channels.${message.channel.id}`;

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    wrongEmbed.setTitle(":x: You do not have Administrator permission!");

    return message.channel.send(wrongEmbed);
  }

  if (!gamemode.includes(secondArg)) {
    wrongEmbed.setTitle("Please choose between 5v5solos, 5v5teams, 3v3solos or 3v3teams");

    return message.channel.send(wrongEmbed);
  }

  await guildsCollection.updateOne(
    {
      id: message.guild.id,
    },
    {
      $set: {
        [a]: secondArg,
      },
    }
  );

  channelMode[message.channel.id] = secondArg;

  correctEmbed.setTitle(":white_check_mark: Done! Have fun :)");

  return message.channel.send(correctEmbed);
};

module.exports = {
  name: "channelmode",
  execute,
};
