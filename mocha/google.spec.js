const path = require('path');
const selenium = require('selenium-standalone');
const webdriverio = require('webdriverio');
const {expect} = require('chai');
require('colors');
const CHROME_DRIVER_VERSION = '2.40';

let SELENIUM_SERVER, client;

describe("Inner Suite 1", function(){
    before(function(){
        this.timeout(200000);
        return startSelenium();
    });
 
    after(function(){
        this.timeout(200000);
        return SELENIUM_SERVER.kill();
    });
    
    beforeEach(function(){
        this.timeout(200000);
        return client.init();
    });
 
    afterEach(function(){
        this.timeout(200000);
        return client.end();
    });
  
    it("Google mocha test", async function(){
        this.timeout(200000);
        await client.url('https://www.google.com/ncr');
        await client.setValue('input[name=q]', 'WebdriverIO');
        await client.click('input[value="Google Search"]');
        const title = await client.getTitle();
        expect(title).equals('WebdriverIO - Google Search');
    });
  
});

function startSelenium () {
    return new Promise((resolve, reject) => {
        console.log('Installing selenium server ...'.bgBlue);
        selenium.install({
            drivers: {
                chrome: {
                    // check for more recent versions of chrome driver here:
                    // https://chromedriver.storage.googleapis.com/index.html
                    version: CHROME_DRIVER_VERSION,
                    arch: process.arch,
                    baseURL: 'https://chromedriver.storage.googleapis.com'
                }
            }
        }, onSeleniumInstall);

        function onSeleniumInstall(err) {
            if (err) {
                throw(`Error installing selenium server: ${err}`.bgRed);
                reject(err);
            }
            console.log('Starting selenium server ...'.bgBlue);
            selenium.start({
                drivers: {
                    chrome: {
                        // check for more recent versions of chrome driver here:
                        // https://chromedriver.storage.googleapis.com/index.html
                        version: CHROME_DRIVER_VERSION,
                        arch: process.arch,
                        baseURL: 'https://chromedriver.storage.googleapis.com'
                    }
                }
            }, onSeleniumStart)
        }
        
        function onSeleniumStart(err, childProcess) {
            if (err) {
                throw(`Error installing selenium server: ${err}`.bgRed);
                reject(err);
            }
            console.log('Selenium server started ...'.bgGreen);
            SELENIUM_SERVER = childProcess;
            client = webdriverio.remote({
                desiredCapabilities: {
                    browserName: 'chrome',
                    chromeOptions: {
                        args: ["--no-sandbox", "--headless", "--disable-dev-shm-usage"]
                    } 
                } 
            });
            resolve();
        }
    });
}