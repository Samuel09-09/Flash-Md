const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5tSkVzaUE0ei93RXFTWGw1RmhFU0xrUXdnK1g1eExHdEJqbUdJeFAxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnE0QUtHeHhVbldXYitvS08vekt3ZkpvZFV0YStMMFdjYUxiMVZnUW1Rdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTGc5NWVWaExjUlU1NWN2RWxrclZxM1BzUkNGdHdXcm5KTjFHeCs2Q0VvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKZGM5MTJHbUhFdDgvN2VFeTNrNCtvUmdLS2NwQzRSZEJkazhuTmdPbmg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9LZ1dCRTdtREtsRjVFdkpGUUQzYk9HSkFwTmZweFpKd3FZOFRzWEVxR2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndPV08xQXFaemxFZWx2RjVJVmxHVzZxLzIvT1ZtVGd5djNzMEhLdzVRR2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0JrMzZyRXJVa215eHVYOXVneEd5MDJLbzM5c25zSG80M0RHYktkeWpsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXNCS1FveFFtTmt6amcvQjZ2RTFYMExUNFl3Skhjc0NZWXl5bDlmcWxrOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRaWk5TUXVBdERURHRKdzdtWjdmSEprcTRTVjVXZldvemtZcUdqNkg2UUlDcS9OeFlGYkpNQjhmZkZSOGNzZDZvNlJkbm5nYkQrV0Rhd0J0NHdTS2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiJCckZ6d2gxSFB6NWd1ei9CbmdGc1VCdXQvMDBRM3BjclZPam9iNmNjdEU0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFbjNlaVZkTVJvaWYydGVRQnAyRnZRIiwicGhvbmVJZCI6IjJkYzAyMWY3LTIzMWQtNGYwNy04ODdkLTNlYWU2MWQ5NzhlZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTTJobzVFM3UrajVXT2VwYk1TYjZPb1JTblU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibldxRzhwVWlDODM4eVh6SEVSM0RaeWxVREs4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik03TEhGTTg5IiwibWUiOnsiaWQiOiIyMzQ5MTIxNDQyNDE0OjQ3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOejFwUGNHRUlTbWdMMEdHQW9nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTU3ZSRndJN2trUnpiNmRIRGJKQnIyNFg2N0VWNjFyd3pMMEp3dmdvY0Q4PSIsImFjY291bnRTaWduYXR1cmUiOiJOS2x2bCs1ak8zcUI0ZEREMWJodDhsejl0U3hESGlKdmQyZVB6MDR3WEVnV2V5K1RpWWQvbEhvcy9mMWZkNXBRaW9YTGszc2M0M0Jha25PYjEvamlBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZHpseEpFZTliUkxPQm9NTnhIV0ZSdW1XWEZva0dwSFpLeTY4bXo3U0RHUkg5K3RCZGxuWmt3cXEvbGM1M3ptR3FaOTZSREY1aW5FK1BYd0Y4S1lYZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTIxNDQyNDE0OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVrcjBSY0NPNUpFYzIrblJ3MnlRYTl1Rit1eEZldGE4TXk5Q2NMNEtIQS8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzg1NDM4ODksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT1E4In0=;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2349121442414",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
