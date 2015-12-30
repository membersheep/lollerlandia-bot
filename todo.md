#LollerlandiaBot
- Deploy on heroku and test with telegram.
- Refactoring:
  - Move all configuration strings to a config.js file.
- Features:
  - Add support for every board.
  - Add support for animated gifs and webms.

Refactor every module so that:
 - Modules should expose an error-first callback interface.
 - Check for errors in callbacks.
 - Always return on callbacks.
 - Use try-catch in sync code only.
 - Test everything.
