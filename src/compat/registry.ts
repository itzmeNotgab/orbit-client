
/**
 * ORBIT CLIENT — Compatibility Registry
 *
 * Only add version ranges after testing them on real devices.
 */

import {
  BedrockVersion,
  CompatibilityStatus,
  isVersionInRange,
} from "./bedrockVersion";

export type OrbitFeature =
  | "hud"
  | "coordinates"
  | "fps"
  | "compass"
  | "waypoints"
  | "resource_packs";

export interface FeatureCompatibility {
  status: CompatibilityStatus;
  notes: string;
}

export interface CompatibilityEntry {
  minimum: BedrockVersion;
  maximum: BedrockVersion;
  features: Partial<
    Record<OrbitFeature, FeatureCompatibility>
  >;
}

/**
 * Intentionally empty.
 *
 * Add entries only after a Bedrock version has been tested.
 * Never mark an untested version as supported.
 */
export const COMPATIBILITY_REGISTRY: CompatibilityEntry[] = [];

/**
 * Finds the compatibility entry matching a game version.
 */
export function findCompatibilityEntry(
  version: BedrockVersion
): CompatibilityEntry | undefined {
  return COMPATIBILITY_REGISTRY.find((entry) =>
    isVersionInRange(version, entry.minimum, entry.maximum)
  );
}

/**
 * Returns the tested status of a feature.
 * Missing entries always return "unknown".
 */
export function getFeatureCompatibility(
  version: BedrockVersion,
  feature: OrbitFeature
): FeatureCompatibility {
  const entry = findCompatibilityEntry(version);
  const result = entry?.features[feature];

  return result ?? {
    status: "unknown",
    notes: "This feature has not been verified for this version.",
  };
}

/**
 * Checks whether a feature is explicitly marked as supported.
 */
export function isFeatureSupported(
  version: BedrockVersion,
  feature: OrbitFeature
): boolean {
  return getFeatureCompatibility(version, feature).status ===
    "supported";
}
