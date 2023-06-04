import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://staging.app.holocene.eu",
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 100000,
    defaultCommandTimeout: 12000,
    video: false,
    retries: 0,
    scrollBehavior: "center",
    chromeWebSecurity: false,
  },
});
