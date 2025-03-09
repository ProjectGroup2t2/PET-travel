module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // ใช้ Babel แปลงโค้ดให้รองรับ ES Modules
    },
    moduleNameMapper: {
      "^axios$": require.resolve("axios"), // บังคับ Jest ให้ใช้ CommonJS ของ axios
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)", // บอก Jest ให้แปลง axios ด้วย Babel
    ],
    testEnvironment: "jsdom", // ใช้ jsdom จำลอง DOM สำหรับ React
  };
  