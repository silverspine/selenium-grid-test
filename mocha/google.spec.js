const selenium = require('selenium-standalone');
const webdriverio = require('webdriverio');
const {expect} = require('chai');
require('colors');

let SELENIUM_SERVER, client;

describe("Inner Suite 1", function(){
    before(async function(){
        await startSelenium();
    });
 
    after(async function(){
        await SELENIUM_SERVER.kill();
    });
    
    beforeEach(async function(){
        await client.init();
    });
 
    afterEach(function(){
        return client.end();
    });
  
    it("Google mocha test", async function(){
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
        }, onSeleniumInstall);

        function onSeleniumInstall(err) {
            if (err) {
                throw(`Error installing selenium server: ${err}`.bgRed);
                reject(err);
            }
            console.log('Starting selenium server ...'.bgBlue);
            selenium.start({}, onSeleniumStart)
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
                        args: ["--no-sandbox", "disable-web-security", "--disable-dev-shm-usage"]
                    } 
                } 
            });
            resolve();
        }
    });
}