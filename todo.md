#LollerlandiaBot
Refactor every module so that:
 - Use dependency injection with factory pattern.
 - Modules should expose an error-first callback interface.
 - Check for errors in callbacks.
 - Always return on callbacks.
 - Use try-catch in sync code only.
 - Test everything.
