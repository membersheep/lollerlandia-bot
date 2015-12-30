var config = {};

config.SERVER_PORT = process.env.PORT || 3000;

config.TOKEN = '158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc';
config.TELEGRAM_BASE_URL = "https://api.telegram.org/bot";
config.TELEGRAM_SETUP_WEBHOOK = "/setWebhook?url=:url";
config.TELEGRAM_POST_IMAGE = "/sendPhoto";

config.CHAN_BASE_URL = "http://a.4cdn.org/";
config.CHAN_IMAGE_BASE_URL = "http://i.4cdn.org/";

module.exports = config;
