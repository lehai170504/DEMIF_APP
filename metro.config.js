// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Chú ý: input phải trỏ đúng vào file global.css bạn đã tạo
module.exports = withNativeWind(config, { input: "./src/global.css" });