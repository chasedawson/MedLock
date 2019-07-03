module.exports = {
    setupFiles: [
        '<rootDir>/src/test/setupTests.js',
    ],
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/styleMock.js',
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/styleMock.js'

    }
    
};