let client = global.WEBDRIVER_CLIENT;

beforeEach(async () => {;
    await client.init();
})

test('Google Search for WebdriverIO has correct title', async () => {
    jest.setTimeout(30000)
    await client.url('https://www.google.com/search?q=WebdriverIO');
    const title = await client.getTitle();
    expect(title).toBe('WebdriverIO - Google Search');
});

afterEach(async () => {
    await client.end();
});