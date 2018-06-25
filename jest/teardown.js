const selenium = require('selenium-standalone');


module.exports = async function () {
    console.log('Killing selenium server ...'.bgBlue)
    await global.SELENIUM_SERVER.kill();
}
