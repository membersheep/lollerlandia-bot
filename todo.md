#LollerlandiaBot
An Expressjs app which:
  - attaches routes to its endpoints.
  - listens for requests on those endpoints.

##Routes

##Modules

###Status
Gives the status of the app.

###4chanCommunicator
Module to communicate with 4chan APIs:
- randomImage: downloads a random image from /b/ to a specific location

###TelegramCommunicator
Module to communicate with telegram bot APIs:
- setWebhook: https://core.telegram.org/bots/api#setwebhook set webhook to our routes
- sendPhoto: https://core.telegram.org/bots/api#sendphoto
