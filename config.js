var config = {};

config.SERVER_PORT = process.env.PORT || 3000;

config.TOKEN = '158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc';
config.TELEGRAM_BASE_URL = "https://api.telegram.org/bot";
config.TELEGRAM_SETUP_WEBHOOK = "/setWebhook?url=:url";
config.TELEGRAM_POST_IMAGE = "/sendPhoto";

config.CHAN_BASE_URL = "http://a.4cdn.org/";
config.CHAN_IMAGE_BASE_URL = "http://i.4cdn.org/";

config.GENERIC_COMMANDS = ["/start", "/help"];
config.CHAN_SAFE_COMMANDS = ["/wsg"];
config.CHAN_UNSAFE_COMMANDS = ["/b", "/gif"];

config.COMMANDS = config.GENERIC_COMMANDS.concat(config.CHAN_SAFE_COMMANDS).concat(config.CHAN_UNSAFE_COMMANDS);
config.BOARD_COMMANDS = config.CHAN_SAFE_COMMANDS.concat(config.CHAN_UNSAFE_COMMANDS);

module.exports = config;
