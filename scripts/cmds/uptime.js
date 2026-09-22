const axios = require("axios");

module.exports = {
  config: {
    name: "angela",
    aliases: ["angel", "askangela"],
    version: "1.0.0",
    description: "Chat with Angela AI - Specialized for Ariel Aks Otaku",
    usage: "{prefix}angela [your question]",
    credit: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    hasPrefix: true,
    permission: "PUBLIC",
    cooldown: 5,
    category: "UTILITY"
  },

  run: async function({ api, message, args }) {
    const { threadID, messageID, senderID } = message;
    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("✨ 𝐇𝐞𝐥𝐥𝐨! 𝐈 𝐚𝐦 𝐀𝐧𝐠𝐞𝐥𝐚.\n━━━━━━━━━━━━━━━━━━\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 𝐬𝐨 𝐈 𝐜𝐚𝐧 𝐡𝐞𝐥𝐩 𝐲𝐨𝐮.\n\n𝐄𝐱𝐚𝐦𝐩𝐥𝐞: #angela Who is Ariel Aks Otaku?", threadID, messageID);
    }

    api.sendMessage("🔍 𝐀𝐧𝐠𝐞𝐥𝐚 𝐢𝐬 𝐭𝐡𝐢𝐧𝐤𝐢𝐧𝐠...", threadID, (err, info) => {
      // We will use a reliable AI API endpoint for the 'new model' feel
      setTimeout(async () => {
        try {
          const response = await axios.get(`https://api.kenliejugarap.com/blackbox/?text=${encodeURIComponent(prompt)}`);
          const answer = response.data.response;

          const formattedRes = `✨ 𝐀𝐍𝐆𝐄𝐋𝐀 𝐀𝐈 ✨\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `${answer}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `👤 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐀𝐫𝐢𝐞𝐥 𝐀𝐤𝐬 𝐎𝐭𝐚𝐤𝐮\n` +
            `🎀 𝐇𝐚𝐯𝐞 𝐚 𝐠𝐫𝐞𝐚𝐭 𝐝𝐚𝐲!`;

          api.unsendMessage(info.messageID);
          return api.sendMessage(formattedRes, threadID, messageID);
        } catch (error) {
          global.logger.error(`Error in Angela command: ${error.message}`);
          api.unsendMessage(info.messageID);
          return api.sendMessage("❌ Sorry, Angela is having trouble connecting to her brain right now. Please try again later.", threadID, messageID);
        }
      }, 1000);
    }, messageID);
  }
};
