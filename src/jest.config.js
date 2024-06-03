module.exports = {
    setupFilesAfterEnv: ['./setupTests.js'],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx"],
    testEnvironment: "jsdom",
  };
  