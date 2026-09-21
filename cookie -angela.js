const axios = require("axios");

// TES COOKIES — directement dans la commande
const COOKIES_ARRAY = [
    { "name": "ps_l", "value": "1" },
    { "name": "datr", "value": "Y7tYaucHr2qxhGhmZEaO84i5" },
    { "name": "fr", "value": "0JNRCOdfbxyYY3Mxc.AWfQRJo_aRLBgE2eMDx4GXMQqcFh0uouEkUKpJvasGH5dASRnbU.BqWLtj..AAA.0.0.BqsTLI.AWedEHdXwiGK1mahX5AFjRVpfEw" },
    { "name": "xs", "value": "32%3AuDQDRESNJX1ZaA%3A2%3A1789997681%3A-1%3A-1" },
    { "name": "c_user", "value": "61591618425912" },
    { "name": "pas", "value": "61591618425912%3Afywy19tVrP%2C100080077652459%3A8NGxbyEcxV%2C61588944097723%3AAVSiTaOVr4%2C61583745495456%3ATrbCgQgw6a%2C61591480225146%3AtSkjCxuTbn%2C61592864031822%3AmEwpWGk4Df%2C61593715842737%3AruQc56PE6U%2C61594383005046%3AktEuO5H3wn" },
    { "name": "sb", "value": "Y7tYarU2ij6V7J9M04AKXyS9" },
    { "name": "locale", "value": "fr_FR" }
];

// Convertir en chaîne de cookies
const COOKIE_STRING = COOKIES_ARRAY.map(c => `${c.name}=${c.value}`).join("; ");

// Garder actif toutes les 10 secondes
setInterval(async () => {
  try {
    await axios.get("https://www.facebook.com", {
      headers: {
        "Cookie": COOKIE_STRING,
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0"
      },
      timeout: 8000
    });
    console.log("✅ ANGELA ACTIVE — Cookie OK — Ariel Aks Otaku");
  } catch (e) {
    console.log("⚠️ Vérification...");
  }
}, 10000); // 10 secondes

module.exports = {
  config: {
    name: "cookie",
    aliases: ["cookies", "angela-cookie"],
    version: "1.0.0",
    author: "Ariel Aks Otaku",
    countDown: 3,
    role: 2, // SEULS LES ADMINS PEUVENT UTILISER
    shortDescription: "🔐 Gestionnaire de cookies Angela",
    longDescription: "Garde le compte actif et gère la connexion par cookies",
    category: "system",
    guide: "cookie"
  },

  onStart: async function({ api, event }) {
    const { threadID, senderID } = event;
    
    // Vérifie si c'est TOI le créateur
    const IS_ARIEL = senderID === "61591618425912";
    
    if (!IS_ARIEL) {
      return api.sendMessage("❌ Seul Ariel Aks Otaku peut utiliser cette commande !", threadID);
    }

    const msg = `
🔐 ANGELA — GESTIONNAIRE DE CONNEXION
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Cookies chargés avec succès
👤 Propriétaire : Ariel Aks Otaku
🆔 ID : 61591618425912
🔄 Surveillance : toutes les 10 secondes
📌 Statut : ACTIF — En attente
━━━━━━━━━━━━━━━━━━━━━━━━━━
Toutes les commandes utilisent maintenant cette connexion.
    `.trim();

    return api.sendMessage(msg, threadID);
  },

  // Pour que toutes tes commandes utilisent ce cookie
  getCookie: function() {
    return COOKIE_STRING;
  },
  
  getHeaders: function() {
    return {
      "Cookie": COOKIE_STRING,
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36",
      "Referer": "https://www.facebook.com/"
    };
  }
};
  
