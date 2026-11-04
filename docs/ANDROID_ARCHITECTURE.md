
# ORBIT CLIENT — Android Architecture

**Tagline:** Beyond Vanilla.

## Project Goal

ORBIT is an Android-focused Minecraft Bedrock client project.

The goal is to build a lightweight, reliable client with configurable modules, an in-game interface, a customizable HUD, and broad Minecraft version compatibility.

Target compatibility: Bedrock releases spanning at least 12 months, where supported by the chosen integration method.

## Technology Stack

### Main Application
- React Native
- TypeScript
- Expo during the launcher development phase

### Android Native Layer
- Kotlin for Android platform integration
- C++ only where native performance or supported integration requires it
- Gradle for Android builds

### Performance
- Profile before optimizing
- Rust is optional and only allowed when benchmarks demonstrate a real benefit

## Architecture

Separate ORBIT into these components:

1. Launcher
   - Application interface
   - Minecraft installation detection
   - Launch support where Android permits it
   - Client settings

2. Client Core
   - Module registry
   - Configuration management
   - Feature compatibility checks
   - Shared client logic

3. Android Integration
   - Android lifecycle
   - Device compatibility
   - Supported Minecraft integration
   - Native platform services

4. HUD System
   - HUD layout configuration
   - Position and size settings
   - Visibility and opacity settings
   - Layout profiles

5. Compatibility Layer
   - Detect installed Bedrock version
   - Track supported version ranges
   - Isolate version-specific functionality
   - Disable unsupported features safely

## Feature Categories

### HUD
- FPS display, only when reliable data is available
- Coordinates, when supported game data is available
- Compass
- Armor status
- Custom HUD layouts

### Visual
- Supported visual preferences
- Resource pack compatibility tools
- Customization options

### Utility
- Waypoints, where supported
- Configuration profiles
- Module settings

### Performance
- Performance diagnostics
- Memory and CPU monitoring
- Lightweight interface
- Battery-conscious behavior

## Compatibility Policy

- Aim for at least 12 months of Bedrock version support.
- Detect the installed game version.
- Keep version-specific code isolated.
- Test compatibility before declaring a release supported.
- Never claim a feature works if it has not been tested.

## Security and Reliability

- Do not collect Microsoft passwords.
- Do not expose authentication tokens.
- Do not modify Minecraft worlds without user permission.
- Do not bypass anti-cheat or platform protections.
- Do not use unsupported binary patching or injection.
- Preserve user data and provide clear warnings before risky operations.

## Development Rules

- No fake or placeholder features presented as working.
- Every module must have a clear implementation status.
- Test changes before release.
- Keep the launcher separate from the game integration layer.
- Prioritize stability and low resource usage.

## Android Build System

- Gradle Android builds
- GitHub Actions automation
- APK testing before release

## Current Status

Phase 1: Architecture and feasibility research.

No native in-game integration is considered complete until it has been implemented and tested on an actual Android Bedrock installation.
