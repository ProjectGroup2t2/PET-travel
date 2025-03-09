module.exports = {
  preset: "jest-expo", 
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!lucide-react|next)/"
  ],
  moduleNameMapper: {
    "^next/image$": "<rootDir>/jest/__mocks__/next-image.js",
  },
};
