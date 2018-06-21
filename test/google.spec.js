module.exports = {
    'Google can be accessed.': function(browser) {
      browser
        .url('https://www.google.com/ncr')
        .waitForElementVisible('body')
        .setValue('input[name=q]', 'nightwatch')
        .click('input[value="Google Search"]')
        .pause(5000)
        .assert.title('nightwatch - Google Search')
        .end();
    }
};
