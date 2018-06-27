const DEV_ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('dev');

module.exports = async function () {
    if (DEV_ENV) {
        console.log('Killing selenium server ...'.bgBlue);
        await global.SELENIUM_SERVER.kill();
        console.log('Killed selenium server'.bgGreen);
    }
}
