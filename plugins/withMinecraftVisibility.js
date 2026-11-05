const { withAndroidManifest } = require("expo/config-plugins");

function withMinecraftVisibility(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    if (!manifest.queries) {
      manifest.queries = [];
    }

    if (!manifest.queries[0]) {
      manifest.queries.push({});
    }

    const queries = manifest.queries[0];

    if (!queries.package) {
      queries.package = [];
    }

    const alreadyAdded = queries.package.some(
      (item) =>
        item.$?.["android:name"] === "com.mojang.minecraftpe"
    );

    if (!alreadyAdded) {
      queries.package.push({
        $: {
          "android:name": "com.mojang.minecraftpe",
        },
      });
    }

    return config;
  });
}

module.exports = withMinecraftVisibility;
