
/**
 * ORBIT CLIENT — Bedrock Version Utilities
 *
 * Parses and compares Minecraft Bedrock version numbers.
 * This file does not detect the installed game or claim compatibility.
 */

export interface BedrockVersion {
  major: number;
  minor: number;
  patch: number;
  build?: number;
}

export type CompatibilityStatus =
  | "supported"
  | "testing"
  | "unsupported"
  | "unknown";

/**
 * Parses versions such as:
 * 1.21.80
 * 1.21.80.3
 */
export function parseBedrockVersion(
  input: string
): BedrockVersion | null {
  const match = input.trim().match(
    /^v?(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?$/
  );

  if (!match) return null;

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    build: match[4] === undefined
      ? undefined
      : Number(match[4]),
  };
}

/**
 * Returns:
 * -1 if a is older than b
 *  0 if they are equal
 *  1 if a is newer than b
 */
export function compareBedrockVersions(
  a: BedrockVersion,
  b: BedrockVersion
): number {
  const partsA = [
    a.major,
    a.minor,
    a.patch,
    a.build ?? 0,
  ];

  const partsB = [
    b.major,
    b.minor,
    b.patch,
    b.build ?? 0,
  ];

  for (let i = 0; i < partsA.length; i++) {
    if (partsA[i] < partsB[i]) return -1;
    if (partsA[i] > partsB[i]) return 1;
  }

  return 0;
}

/**
 * Checks whether a version is inside a supported range.
 * The range must be supplied from a verified compatibility registry.
 */
export function isVersionInRange(
  version: BedrockVersion,
  minimum: BedrockVersion,
  maximum: BedrockVersion
): boolean {
  return (
    compareBedrockVersions(version, minimum) >= 0 &&
    compareBedrockVersions(version, maximum) <= 0
  );
}
