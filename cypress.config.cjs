const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '1cdct5',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})