const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {

        },
        specPattern: 'cypress/integration/**/*.spec.js', // Το μοτίβο αρχείων για τα tests
    },
});
