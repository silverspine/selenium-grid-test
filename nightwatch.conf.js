const path = require("path");

const CONF = {
    seleniumGrid: {
        port: 4444,
        host: "10.38.101.211"
    }
};
const PATH = {
    tests: path.resolve(__dirname, "./test"),
    reports: path.resolve(__dirname, "./reports"),
    bin: {
        selenium: path.resolve(__dirname, "./bin/selenium-server-standalone-3.11.0.jar"),
        chromedriver: path.resolve(__dirname, "./bin/chromedriver_linux")
    }
}

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
    "src_folders": [
        PATH.tests
    ],
    "output_folder": PATH.reports,
    "selenium": {
        "start_process": true, // tells nightwatch to start/stop the selenium process
        "server_path": PATH.bin.selenium,
        "host": seleniumGrid.host,
        "port": seleniumGrid.port,
        "cli_args": {
            "webdriver.chrome.driver": PATH.bin.chromedriver
        }
    },
    // Test Environments, can be passed to nightwatch CLI via the -e <ENV_NAME>
    "test_settings": {
        "default": {
            "selenium_port": CONF.seleniumGrid.port,
            "selenium_host": CONF.seleniumGrid.host,
            "globals": {
                "waitForConditionTimeout": 5000
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "chromeOptions": {
                    "args": ["--no-sandbox", "disable-web-security"]
                }
            }
        },
        "chrome_grid": {
            "selenium_port": CONF.seleniumGrid.port,
            "selenium_host": CONF.seleniumGrid.host,
            "globals": {
                "waitForConditionTimeout": 5000
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "chromeOptions": {
                    "args": ["--no-sandbox", "disable-web-security"]
                }
            }
        }
    }
}

module.exports.PATH = PATH;