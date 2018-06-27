const path = require('path');
const selenium = require('selenium-standalone');
const webdriverio = require('webdriverio');
const {expect} = require('chai');
require('colors');

const DEV_ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('dev'),
    PROD_ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('prod'),
    HEADLESS_CHROME = process.env.CHROME_MODE && process.env.CHROME_MODE.toLowerCase().includes('headless'),
    CHROME_DRIVER_VERSION = '2.40',
    GRID_HOST = '10.38.102.191';

let SELENIUM_SERVER, WEBDRIVER_CLIENT;

describe("Google Spec Suite", function(){
    before(async function() {
        this.timeout(200000);
        if (DEV_ENV) {
            await startSelenium();
        }
        startWebdriverClient();
    });
 
    after(async function(){
        this.timeout(200000);
        if (DEV_ENV) {
            await SELENIUM_SERVER.kill();
        }
    });
    
    beforeEach(function(){
        this.timeout(200000);
        return WEBDRIVER_CLIENT.init();
    });
 
    afterEach(function(){
        this.timeout(200000);
        return WEBDRIVER_CLIENT.end();
    });
  
    it('Google "WebdriverIO" test', async function(){
        this.timeout(200000);
        await WEBDRIVER_CLIENT.url('https://www.google.com/search?q=WebdriverIO');
        // await WEBDRIVER_CLIENT.setValue('input[name=q]', 'WebdriverIO');
        // await WEBDRIVER_CLIENT.click('input[value="Google Search"]');
        const title = await WEBDRIVER_CLIENT.getTitle();
        expect(title).equals('WebdriverIO - Google Search');
    });

    it('Google "Mocha" test', async function(){
        this.timeout(200000);
        await WEBDRIVER_CLIENT.url('https://www.google.com/search?q=Mocha');
        // await WEBDRIVER_CLIENT.setValue('input[name=q]', 'WebdriverIO');
        // await WEBDRIVER_CLIENT.click('input[value="Google Search"]');
        const title = await WEBDRIVER_CLIENT.getTitle();
        expect(title).equals('Mocha - Google Search');
    });

    it('Google "Expedia" test', async function(){
        this.timeout(200000);
        await WEBDRIVER_CLIENT.url('https://www.google.com/search?q=Expedia');
        // await WEBDRIVER_CLIENT.setValue('input[name=q]', 'WebdriverIO');
        // await WEBDRIVER_CLIENT.click('input[value="Google Search"]');
        const title = await WEBDRIVER_CLIENT.getTitle();
        expect(title).equals('Expedia - Google Search');
    });
});

function startSelenium () {
    const CHROME_DRIVER_CONFIG = {
        version: CHROME_DRIVER_VERSION,
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
    };

    return new Promise((resolve, reject) => {
        console.log('Installing selenium server ...'.bgBlue);
        selenium.install({
            drivers: { chrome: CHROME_DRIVER_CONFIG }
        }, onSeleniumInstall);

        function onSeleniumInstall(err) {
            if (err) {
                throw(`Error installing selenium server: ${err}`.bgRed);
                reject(err);
            }
            console.log('Starting selenium server ...'.bgBlue);
            selenium.start({
                drivers: { chrome: CHROME_DRIVER_CONFIG }
            }, onSeleniumStart)
        }
        
        function onSeleniumStart(err, childProcess) {
            if (err) {
                throw(`Error installing selenium server: ${err}`.bgRed);
                reject(err);
            }
            console.log('Selenium server started ...'.bgGreen);
            SELENIUM_SERVER = childProcess;
            resolve();
        }
    });
}

function startWebdriverClient() {
    const webdriverOptions = {
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: ["--no-sandbox", "--disable-dev-shm-usage"]
            } 
        } 
    };

    if (DEV_ENV && HEADLESS_CHROME) {
        webdriverOptions.desiredCapabilities.chromeOptions.args.push("--headless");
    } else if (PROD_ENV) {
        webdriverOptions.port = 4444;
        webdriverOptions.host = GRID_HOST;
        webdriverOptions.desiredCapabilities.chromeOptions.args.push("--headless");
    }

    WEBDRIVER_CLIENT = webdriverio.remote(webdriverOptions);
}