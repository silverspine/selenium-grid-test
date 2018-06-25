const JestNodeEnvironment = require('jest-environment-node');

class PuppeteerEnvironment extends JestNodeEnvironment {
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = PuppeteerEnvironment;