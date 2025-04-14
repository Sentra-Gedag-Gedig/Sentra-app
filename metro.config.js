const { withNativeWind } = require("nativewind/metro");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.resetCache = false;
config.resolver.sourceExts = [
  "jsx",
  "js",
  "ts",
  "tsx",
  "json",
  "css",
  "cjs",
  "mjs",
];

config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = withNativeWind(config, {
  input: "./global.css",
  projectRoot: __dirname,
});
