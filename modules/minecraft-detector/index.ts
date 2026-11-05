import { requireNativeModule } from "expo-modules-core";

export interface MinecraftDetectorModule {
  isMinecraftInstalled(): Promise<boolean>;
}

export default requireNativeModule<MinecraftDetectorModule>(
  "MinecraftDetector"
);
