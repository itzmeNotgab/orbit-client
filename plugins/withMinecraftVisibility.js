
const { withAndroidManifest } = require("expo/config-plugins");

function withMinecraftVisibility(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    if (!manifest.queries) {
      manifest.queries = [];
    }

    const queries = manifest.queries;

    const alreadyAdded = queries.some((query) =>
      query.package?.some(
        (item) =>
          item.$?.["android:name"] ===
          "com.mojang.minecraftpe"
      )
    );

    if (!alreadyAdded) {
      queries.push({
        package: [
          {
            $: {
              "android:name": "com.mojang.minecraftpe",
            },
          },
        ],
      });
    }

    return config;
  });
}

module.exports = withMinecraftVisibility;
