const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.laboratoriodetesting.com',
    viewportWidth: 1400,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log('\n--- LOG DESDE CYPRESS TEST ---\n', message, '\n------------------------------\n');
          return null; // Las tareas deben devolver un valor o una promesa
        },
        // Puedes tener múltiples tareas
        logObject(obj) {
            console.log('\n--- OBJETO LOGUEADO ---\n', JSON.stringify(obj, null, 2), '\n-------------------------\n');
            return null;
        }
      });
    },
  },
});
