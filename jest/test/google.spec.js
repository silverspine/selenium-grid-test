// WEBDRIVERIO STANDALONE + JEST

const webdriverio = require('webdriverio');
const options = {
    desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["--no-sandbox", "disable-web-security", "--disable-dev-shm-usage"]
        } 
    } 
};
const client = webdriverio.remote(options);

beforeEach(async () => {
    await client.init();
})

test('Google Search for WebdriverIO has correct title', async () => {
    jest.setTimeout(30000)
    await client.url('https://www.google.com/ncr');
    await client.setValue('input[name=q]', 'WebdriverIO');
    await client.click('input[value="Google Search"]');
    const title = await client.getTitle();
    expect(title).toBe('WebdriverIO - Google Search');
});

afterEach(async () => {
    await client.end();
});