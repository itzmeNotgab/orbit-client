import { NativeModules, Platform } from "react-native";

type MinecraftNativeModule = {
  isMinecraftInstalled(): Promise<boolean>;
};

const MinecraftDetector =
  NativeModules.MinecraftDetector as
    | MinecraftNativeModule
    | undefined;

export async function isMinecraftInstalled(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  if (!MinecraftDetector) {
    return false;
  }

  try {
    return await MinecraftDetector.isMinecraftInstalled();
  } catch {
    return false;
  }
}
