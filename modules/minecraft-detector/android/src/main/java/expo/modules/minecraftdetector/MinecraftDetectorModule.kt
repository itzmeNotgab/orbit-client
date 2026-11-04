package expo.modules.minecraftdetector

import android.content.pm.PackageManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MinecraftDetectorModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("MinecraftDetector")

        AsyncFunction("isMinecraftInstalled") {
            val context = appContext.reactContext
                ?: return@AsyncFunction false

            try {
                context.packageManager.getPackageInfo(
                    "com.mojang.minecraftpe",
                    0
                )
                true
            } catch (_: PackageManager.NameNotFoundException) {
                false
            }
        }
    }
}
