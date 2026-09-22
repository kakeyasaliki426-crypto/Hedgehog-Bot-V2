module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "cmds", "h"],
    version: "1.0.0",
    description: "Affiche la liste des commandes disponibles ou les détails d'une commande spécifique.",
    usage: "{prefix}help [nom de la commande]",
    credit: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    hasPrefix: true,
    permission: "PUBLIC",
    cooldown: 5,
    category: "UTILITY"
  },

  run: async function({ api, message, args }) {
    const { threadID, messageID } = message;
    const prefix = global.config.prefix;
    const commands = global.client.commands;

    try {
      // Si l'utilisateur demande de l'aide sur une commande spécifique
      if (args[0]) {
        const commandName = args[0].toLowerCase();
        const command = commands.get(commandName) || 
                        Array.from(commands.values()).find(cmd => cmd.config.aliases.includes(commandName));

        if (!command) {
          return api.sendMessage(`❌ La commande "${commandName}" n'existe pas.`, threadID, messageID);
        }

        const { config } = command;
        let msg = `=== 📑 INFOS COMMANDE ===\n\n`;
        msg += `🔹 Nom: ${config.name}\n`;
        msg += `🔹 Aliases: ${config.aliases.length > 0 ? config.aliases.join(", ") : "Aucun"}\n`;
        msg += `🔹 Version: ${config.version}\n`;
        msg += `🔹 Description: ${config.description}\n`;
        msg += `🔹 Usage: ${config.usage.replace(/{prefix}/g, prefix)}\n`;
        msg += `🔹 Cooldown: ${config.cooldown}s\n`;
        msg += `🔹 Permission: ${config.permission}\n`;
        msg += `🔹 Catégorie: ${config.category}\n\n`;
        msg += `👤 Créateur: ${config.credit}`;

        return api.sendMessage(msg, threadID, messageID);
      }

      // Si l'utilisateur demande la liste complète des commandes
      const categories = {};
      let totalCommands = 0;

      for (const [name, command] of commands) {
        const category = command.config.category || "GENERAL";
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(name);
        totalCommands++;
      }

      let helpMsg = `✨ 𝐀𝐍𝐆𝐄𝐋𝐀 𝐁𝐎𝐓 ✨\n`;
      helpMsg += `━━━━━━━━━━━━━━━━━━\n`;

      for (const category in categories) {
        helpMsg += `\n[ ${category.toUpperCase()} ]\n`;
        helpMsg += `→ ${categories[category].join(", ")}\n`;
      }

      helpMsg += `\n━━━━━━━━━━━━━━━━━━\n`;
      helpMsg += `💡 Total: ${totalCommands} commandes\n`;
      helpMsg += `📝 Tapez "${prefix}help [nom]" pour plus d'infos.\n`;
      helpMsg += `👤 Créateur: 𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭`;

      return api.sendMessage(helpMsg, threadID, messageID);

    } catch (error) {
      global.logger.error(`Error in help command: ${error.message}`);
      return api.sendMessage("❌ Une erreur s'est produite lors de l'affichage du menu d'aide.", threadID, messageID);
    }
  }
};
