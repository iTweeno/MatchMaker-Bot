const Discord = require("discord.js");

const { EMBED_COLOR_CHECK, EMBED_COLOR_ERROR, fetchGames } = require("../utils");

const execute = async (message, queueSize) => {
  const wrongEmbed = new Discord.MessageEmbed().setColor(EMBED_COLOR_ERROR);

  const correctEmbed = new Discord.MessageEmbed().setColor(EMBED_COLOR_CHECK);

  const games = await fetchGames(Number(queueSize));
  if (games.length === 0) {
    wrongEmbed.setTitle(":x: No games are currently having place!");

    return message.channel.send(wrongEmbed);
  }

  for (let i = 0; i < 6; i++) {
    const game = games[i];

    if (game == null) {
      correctEmbed.addField("No more games to list ", "Encourage your friends to play!");
      break;
    }

    if (game.channelID === message.channel.id) {
      correctEmbed.addField("Game ID:", ` ${game.gameID}`);
      correctEmbed.addField(
        ":small_orange_diamond: -Team 1-",
        game.team1.reduce((acc = "", curr) => `${acc}<@${curr}>, `, "")
      );
      correctEmbed.addField(
        ":small_blue_diamond: -Team 2-",
        game.team2.reduce((acc = "", curr) => `${acc}<@${curr}>, `, "")
      );

      correctEmbed.setFooter(`Showing page ${1}/${Math.ceil(games.length / 10)}`);
    }
  }
  return message.channel.send(correctEmbed);
};

module.exports = {
  name: "ongoinggames",
  description: "6man bot",
  execute,
};