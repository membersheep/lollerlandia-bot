#LollerlandiaBot
- 4chan service tests
- 4chanAPi tests
- Move all configurations to a config.js file

Refactor every module so that:
 - Modules should expose an error-first callback interface.
 - Check for errors in callbacks.
 - Always return on callbacks.
 - Use try-catch in sync code only.
 - Test everything.
