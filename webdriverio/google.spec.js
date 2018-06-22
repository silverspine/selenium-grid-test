// WEBDRIVERIO TEST RUNNER (MOCHA)

var assert = require('assert');

describe('Google Search', function() {
    it('WebdriverIO search should have the right title', function () {
        browser.url('https://www.google.com/ncr');
        browser.setValue('input[name=q]', 'WebdriverIO');
        browser.click('input[value="Google Search"]');
        browser.pause(2000);
        const title = browser.getTitle();
        assert.equal(title, 'WebdriverIO - Google Search');
    });
});