#LollerlandiaBot
- Deploy on heroku and test with telegram.
- Refactor:
  - Add error handling.
  - Move all configuration strings to a config.js file.
- Features:
  - Check date of the update before reading it.
  - Add support for every board.
  - Send message for unavailable board.
  - Add support for animated gifs and webms.
  - Add /start and /help commands (required).

Refactor every module so that:
 - Modules should expose an error-first callback interface.
 - Check for errors in callbacks.
 - Always return on callbacks.
 - Use try-catch in sync code only.
 - Test everything.
