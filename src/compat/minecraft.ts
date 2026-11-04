import { Platform } from "react-native";
import { requireOptionalNativeModule } from "expo-modules-core";

type MinecraftNativeModule = {
  isMinecraftInstalled(): Promise<boolean>;
};

const MinecraftDetector =
  requireOptionalNativeModule<MinecraftNativeModule>(
    "MinecraftDetector"
  );

export async function isMinecraftInstalled(): Promise<boolean> {
  if (Platform.OS !== "android" || !MinecraftDetector) {
    return false;
  }

  try {
    return await MinecraftDetector.isMinecraftInstalled();
  } catch {
    return false;
  }
}
