const selenium = require('selenium-standalone');
const webdriverio = require('webdriverio');
require('colors');

const DEV_ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('dev'),
    PROD_ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('prod'),
    HEADLESS_CHROME = process.env.CHROME_MODE && process.env.CHROME_MODE.toLowerCase().includes('headless'),
    CHROME_DRIVER_VERSION = '2.40',
    GRID_HOST = '10.38.102.191';

module.exports = async function () {
    if (DEV_ENV) {
        const seleniumServer = await startSelenium();
        global.SELENIUM_SERVER = seleniumServer;
    }
    const webdriverClient = startWebdriverClient();
    global.WEBDRIVER_CLIENT = webdriverClient;
}

function startSelenium () {
    const CHROME_DRIVER_CONFIG = {
        version: CHROME_DRIVER_VERSION,
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
    };
    console.log('Installing selenium server ...'.bgBlue);
    return new Promise((resolve, reject) => {
        selenium.install({
            drivers: { chrome: CHROME_DRIVER_CONFIG }
        }, onSeleniumInstall);

        function onSeleniumInstall(err) {
            if (err) {
                throw(`Error installing selenium server: ${err}`.bgRed);
                reject(err);
            }
            console.log('Finished installing selenium server'.bgGreen);
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
            console.log('Selenium server started'.bgGreen);
            resolve(childProcess);
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

    return webdriverio.remote(webdriverOptions);
}