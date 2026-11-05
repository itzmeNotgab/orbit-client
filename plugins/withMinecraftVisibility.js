const { withAndroidManifest } = require("expo/config-plugins");

function withMinecraftVisibility(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    if (!manifest.queries) {
      manifest.queries = {};
    }

    if (!manifest.queries.package) {
      manifest.queries.package = [];
    }

    const packages = manifest.queries.package;

    const alreadyAdded = packages.some(
      (item) =>
        item.$?.["android:name"] === "com.mojang.minecraftpe"
    );

    if (!alreadyAdded) {
      packages.push({
        $: {
          "android:name": "com.mojang.minecraftpe",
        },
      });
    }

    return config;
  });
}

module.exports = withMinecraftVisibility;
