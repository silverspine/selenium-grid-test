const path = require("path");

const config = {
    selenium_port: 4444,
    selenium_host: "10.38.102.191",
    path: {
        tests: path.resolve(__dirname, "./test"),
        reports: path.resolve(__dirname, "./reports"),
        selenium: path.resolve(__dirname, "./bin/selenium-server-standalone-3.11.0.jar"),
        chromedriver: path.resolve(__dirname, "./bin/chromedriver_linux")
    }
};

console.log(JSON.stringify(config));

// we use a nightwatch.config.js file so we can include comments and helper functions
module.exports = {
    "src_folders": [
        config.path.tests
    ],
    "output_folder": config.path.reports,
    "selenium": {
        "start_process": true,
        "server_path": config.path.selenium,
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": config.path.chromedriver
        }
    },
    // Test Environments, can be passed to nightwatch CLI via the -e <ENV_NAME>
    "test_settings": {
        "chrome_grid": {
            "selenium_port": config.selenium_port,
            "selenium_host": config.selenium_host,
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
        "chrome_local": {
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
        "mac_chrome_local": {
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
