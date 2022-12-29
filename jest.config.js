const path = require('path')

module.exports = {
    moduleDirectories: ['node_modules', 'test'],
    collectCoverageFrom: ['src/**/*.js'],
    coverageThreshold: {
        global: {
            statements: 40
        }
    }
}