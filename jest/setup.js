const selenium = require('selenium-standalone');
require('colors');

module.exports = async function () {
    await startSelenium();
}

function startSelenium () {
    return new Promise((resolve, reject) => {
        console.log('Installing selenium server ...'.bgBlue);
        selenium.install({
            // drivers: {
            //     chrome: {
            //         version: '2.37',
            //         arch: process.arch,
            //         baseURL: 'https://chromedriver.storage.googleapis.com'
            //     }
            // }
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
            global.SELENIUM_SERVER = childProcess; 
            resolve(childProcess);
        }
    });
}