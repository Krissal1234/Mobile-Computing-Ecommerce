const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');

module.exports = () => {
    const {
      resolver: { sourceExts, assetExts }
    } = defaultConfig;

    return {
      transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer")
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...sourceExts, "svg", "cjs"] // added 'cjs' here if you need it
      }
    };
};
