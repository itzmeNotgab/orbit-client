import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  StatusBar,
} from "react-native";

const modules = [
  { id: "fps", name: "FPS Display" },
  { id: "coords", name: "Coordinates" },
  { id: "keys", name: "Keystrokes" },
  { id: "particles", name: "Particle Control" },
];

export default function App() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    fps: true,
    coords: false,
    keys: false,
    particles: false,
  });

  const active = Object.values(enabled).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090713" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>ORBIT</Text>
            <Text style={styles.tagline}>BEYOND VANILLA.</Text>
          </View>
          <Text style={styles.ready}>● READY</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.label}>WELCOME TO ORBIT</Text>
          <Text style={styles.heading}>Your game.</Text>
          <Text style={styles.heading}>
            Your <Text style={styles.purple}>control.</Text>
          </Text>
          <Text style={styles.description}>
            Your Minecraft Bedrock companion, designed for performance and customization.
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.number}>{active}</Text>
            <Text style={styles.statLabel}>ACTIVE MODULES</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.number}>{modules.length}</Text>
            <Text style={styles.statLabel}>AVAILABLE</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>QUICK MODULES</Text>
        <Text style={styles.sectionSubtitle}>DEMO SETTINGS</Text>

        {modules.map((item) => (
          <View key={item.id} style={styles.moduleCard}>
            <Text style={styles.moduleName}>{item.name}</Text>
            <Switch
              value={enabled[item.id]}
              onValueChange={(value) =>
                setEnabled((previous) => ({
                  ...previous,
                  [item.id]: value,
                }))
              }
              trackColor={{ false: "#393244", true: "#A56BFF" }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>ORBIT CLIENT</Text>
          <Text style={styles.footerText}>Version 1.0.0 • Early Development</Text>
          <Text style={styles.description}>
            These switches currently control demo settings only.
            Minecraft integration is not implemented yet.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090713",
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 4,
  },
  tagline: {
    color: "#A56BFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 3,
    marginTop: 4,
  },
  ready: {
    color: "#65E6A5",
    fontSize: 11,
    fontWeight: "800",
  },
  hero: {
    backgroundColor: "#151122",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#292139",
    marginBottom: 18,
  },
  label: {
    color: "#A56BFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 16,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
  },
  purple: {
    color: "#A56BFF",
  },
  description: {
    color: "#9991AA",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 14,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#151122",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#292139",
    padding: 17,
  },
  number: {
    color: "#A56BFF",
    fontSize: 27,
    fontWeight: "900",
  },
  statLabel: {
    color: "#9991AA",
    fontSize: 9,
    fontWeight: "800",
    marginTop: 5,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: "#9991AA",
    fontSize: 9,
    marginBottom: 14,
  },
  moduleCard: {
    backgroundColor: "#151122",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#292139",
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    marginTop: 35,
    alignItems: "center",
  },
  footerTitle: {
    color: "#A56BFF",
    fontWeight: "900",
    letterSpacing: 3,
  },
  footerText: {
    color: "#9991AA",
    fontSize: 11,
    marginTop: 8,
  },
});
