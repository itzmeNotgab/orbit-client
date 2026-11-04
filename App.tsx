
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";

const categories = ["HUD", "Visual", "Utility", "Performance", "Client"];

const modules = [
  { id: "fps", name: "FPS Display", category: "HUD", description: "FPS widget preview." },
  { id: "coords", name: "Coordinates", category: "HUD", description: "Coordinates widget preview." },
  { id: "compass", name: "Compass", category: "HUD", description: "Compass widget preview." },
  { id: "armor", name: "Armor Status", category: "HUD", description: "Equipment status preview." },
  { id: "keystrokes", name: "Keystrokes", category: "HUD", description: "Input display preview." },
  { id: "minimap", name: "Minimap", category: "HUD", description: "Map mockup and manual waypoint planning." },
  { id: "crosshair", name: "Crosshair", category: "Visual", description: "Crosshair style preview." },
  { id: "particles", name: "Particle Preferences", category: "Visual", description: "Particle settings guide." },
  { id: "quicknotes", name: "Quick Notes", category: "Utility", description: "Keep notes beside your game." },
  { id: "waypoints", name: "Waypoints", category: "Utility", description: "Save manual waypoint notes." },
  { id: "packguide", name: "Pack Guide", category: "Utility", description: "Resource pack tips." },
  { id: "loweffects", name: "Low Effects Preset", category: "Performance", description: "Lightweight settings checklist." },
  { id: "battery", name: "Battery Saver Profile", category: "Performance", description: "Companion battery profile." },
  { id: "notifications", name: "Notifications", category: "Client", description: "Notification preferences." },
  { id: "compact", name: "Compact Interface", category: "Client", description: "Compact app interface." },
];

const initialEnabled = Object.fromEntries(
  modules.map((item) => [item.id, item.id === "fps"])
);

export default function App() {
  const [category, setCategory] = useState("HUD");
  const [enabled, setEnabled] = useState(initialEnabled);
  const [favorites, setFavorites] = useState(["fps"]);
  const [expanded, setExpanded] = useState("fps");
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [screen, setScreen] = useState("modules");

  const [settings, setSettings] = useState({
    fps: { size: 16, opacity: 100 },
    coords: { size: 14, opacity: 100 },
    compass: { size: 18, opacity: 100 },
    armor: { size: 20, opacity: 100 },
    keystrokes: { size: 18, opacity: 100 },
    minimap: { size: 120, opacity: 90 },
  });

  const [positions, setPositions] = useState({
    fps: { x: 10, y: 10 },
    coords: { x: 10, y: 60 },
    compass: { x: 150, y: 10 },
    minimap: { x: 150, y: 60 },
  });

  const [selected, setSelected] = useState("fps");

  const visibleModules = useMemo(() => {
    return modules.filter((item) => {
      const matchesCategory = item.category === category;
      const matchesSearch = (item.name + item.description)
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFavorite = !favoritesOnly || favorites.includes(item.id);

      return matchesCategory && matchesSearch && matchesFavorite;
    });
  }, [category, search, favoritesOnly, favorites]);

  const activeCount = Object.values(enabled).filter(Boolean).length;

  function updateSetting(id, key, value) {
    setSettings((old) => ({
      ...old,
      [id]: { ...(old[id] || {}), [key]: value },
    }));
  }

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
  }

  function moveWidget(id, dx, dy) {
    setPositions((old) => ({
      ...old,
      [id]: {
        x: Math.max(0, Math.min(250, old[id].x + dx)),
        y: Math.max(0, Math.min(190, old[id].y + dy)),
      },
    }));
  }

  function renderSettings(item) {
    const values = settings[item.id] || { size: 18, opacity: 100 };

    return (
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>MODULE SETTINGS</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Size: {values.size ?? 18}</Text>
          <View style={styles.controls}>
            <Pressable
              style={styles.smallButton}
              onPress={() =>
                updateSetting(item.id, "size", Math.max(8, (values.size ?? 18) - 2))
              }
            >
              <Text style={styles.buttonText}>−</Text>
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={() =>
                updateSetting(item.id, "size", Math.min(150, (values.size ?? 18) + 2))
              }
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Opacity: {values.opacity ?? 100}%</Text>
          <View style={styles.controls}>
            <Pressable
              style={styles.smallButton}
              onPress={() =>
                updateSetting(item.id, "opacity", Math.max(0, (values.opacity ?? 100) - 10))
              }
            >
              <Text style={styles.buttonText}>−</Text>
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={() =>
                updateSetting(item.id, "opacity", Math.min(100, (values.opacity ?? 100) + 10))
              }
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090713" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>◉ ORBIT</Text>
            <Text style={styles.tagline}>BEYOND VANILLA.</Text>
          </View>
          <Text style={styles.ready}>● READY</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>ORBIT CLIENT • V1.2</Text>
          <Text style={styles.heading}>Your game.</Text>
          <Text style={styles.heading}>
            Your <Text style={styles.purple}>control.</Text>
          </Text>
          <Text style={styles.description}>
            A customizable Minecraft Bedrock companion.
          </Text>

          <View style={styles.stats}>
            <Text style={styles.stat}>{activeCount} ENABLED</Text>
            <Text style={styles.stat}>{modules.length} MODULES</Text>
          </View>
        </View>

        <View style={styles.navigation}>
          <Pressable
            style={[styles.navButton, screen === "modules" && styles.selectedNav]}
            onPress={() => setScreen("modules")}
          >
            <Text style={styles.navText}>CLICKGUI</Text>
          </Pressable>
          <Pressable
            style={[styles.navButton, screen === "editor" && styles.selectedNav]}
            onPress={() => setScreen("editor")}
          >
            <Text style={styles.navText}>HUD EDITOR</Text>
          </Pressable>
        </View>

        {screen === "modules" ? (
          <>
            <Text style={styles.sectionTitle}>MODULES</Text>
            <TextInput
              style={styles.search}
              placeholder="Search modules..."
              placeholderTextColor="#81778F"
              value={search}
              onChangeText={setSearch}
            />

            <Pressable
              style={styles.favoriteFilter}
              onPress={() => setFavoritesOnly(!favoritesOnly)}
            >
              <Text style={styles.categoryText}>
                {favoritesOnly ? "★ SHOWING FAVORITES" : "☆ SHOW FAVORITES"}
              </Text>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.category,
                    category === item && styles.selectedCategory,
                  ]}
                  onPress={() => {
                    setCategory(item);
                    setFavoritesOnly(false);
                  }}
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {visibleModules.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.moduleHeader}>
                  <Pressable
                    style={styles.moduleInfo}
                    onPress={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                  >
                    <Text style={styles.moduleName}>{item.name}</Text>
                    <Text style={styles.moduleDescription}>
                      {item.description}
                    </Text>
                  </Pressable>

                  <Pressable onPress={() => toggleFavorite(item.id)}>
                    <Text style={styles.star}>
                      {favorites.includes(item.id) ? "★" : "☆"}
                    </Text>
                  </Pressable>

                  <Switch
                    value={Boolean(enabled[item.id])}
                    onValueChange={(value) =>
                      setEnabled((old) => ({ ...old, [item.id]: value }))
                    }
                    trackColor={{ false: "#393244", true: "#8B50E8" }}
                  />
                </View>

                <Text style={styles.status}>
                  {enabled[item.id] ? "● ENABLED" : "○ DISABLED"}
                </Text>

                {expanded === item.id && renderSettings(item)}
              </View>
            ))}
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>HUD EDITOR</Text>
            <Text style={styles.description}>
              Select a widget, then use the arrows to move it around.
            </Text>

            <View style={styles.canvas}>
              {["fps", "coords", "compass", "minimap"].map((id) => (
                <Pressable
                  key={id}
                  onPress={() => setSelected(id)}
                  style={[
                    styles.widget,
                    {
                      left: positions[id].x,
                      top: positions[id].y,
                      borderColor: selected === id ? "#D2AFFF" : "#71539A",
                    },
                  ]}
                >
                  <Text style={styles.widgetText}>{id.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.settingLabel}>
              SELECTED: {selected.toUpperCase()}
            </Text>

            <View style={styles.moveControls}>
              <Pressable
                style={styles.moveButton}
                onPress={() => moveWidget(selected, 0, -10)}
              >
                <Text style={styles.buttonText}>↑</Text>
              </Pressable>
              <Pressable
                style={styles.moveButton}
                onPress={() => moveWidget(selected, -10, 0)}
              >
                <Text style={styles.buttonText}>←</Text>
              </Pressable>
              <Pressable
                style={styles.moveButton}
                onPress={() => moveWidget(selected, 0, 10)}
              >
                <Text style={styles.buttonText}>↓</Text>
              </Pressable>
              <Pressable
                style={styles.moveButton}
                onPress={() => moveWidget(selected, 10, 0)}
              >
                <Text style={styles.buttonText}>→</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.reset}
              onPress={() =>
                setPositions({
                  fps: { x: 10, y: 10 },
                  coords: { x: 10, y: 60 },
                  compass: { x: 150, y: 10 },
                  minimap: { x: 150, y: 60 },
                })
              }
            >
              <Text style={styles.navText}>RESET LAYOUT</Text>
            </Pressable>
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>ORBIT CLIENT</Text>
          <Text style={styles.footerText}>BEYOND VANILLA.</Text>
          <Text style={styles.disclaimer}>
            Companion app preview only. These controls do not modify Minecraft,
            inject code or bypass protections. Live game data requires supported
            Bedrock integration.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#090713" },
  content: { padding: 18, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  logo: { color: "#FFF", fontSize: 27, fontWeight: "900", letterSpacing: 3 },
  tagline: { color: "#A56BFF", fontSize: 9, fontWeight: "900", letterSpacing: 3 },
  ready: { color: "#8CE8B7", fontSize: 10, fontWeight: "900" },
  hero: { backgroundColor: "#151122", borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#302443", marginBottom: 20 },
  eyebrow: { color: "#A56BFF", fontSize: 9, fontWeight: "900", marginBottom: 12 },
  heading: { color: "#FFF", fontSize: 34, fontWeight: "900" },
  purple: { color: "#B889FF" },
  description: { color: "#A69DB6", fontSize: 12, lineHeight: 19, marginTop: 10 },
  stats: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, borderTopWidth: 1, borderTopColor: "#302443", paddingTop: 15 },
  stat: { color: "#C69BFF", fontSize: 10, fontWeight: "900" },
  navigation: { flexDirection: "row", backgroundColor: "#151122", borderRadius: 12, padding: 4, marginBottom: 22 },
  navButton: { flex: 1, padding: 12, alignItems: "center", borderRadius: 9 },
  selectedNav: { backgroundColor: "#382253" },
  navText: { color: "#E2CEFF", fontSize: 10, fontWeight: "900" },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "900", marginBottom: 12 },
  search: { backgroundColor: "#151122", borderWidth: 1, borderColor: "#302443", borderRadius: 12, color: "#FFF", padding: 13, marginBottom: 12 },
  favoriteFilter: { alignSelf: "flex-start", borderWidth: 1, borderColor: "#74529A", borderRadius: 20, padding: 9, marginBottom: 12 },
  category: { backgroundColor: "#151122", borderWidth: 1, borderColor: "#342A43", borderRadius: 10, padding: 11, marginRight: 7, marginBottom: 15 },
  selectedCategory: { backgroundColor: "#382253", borderColor: "#A56BFF" },
  categoryText: { color: "#DCCBEE", fontSize: 10, fontWeight: "800" },
  card: { backgroundColor: "#151122", borderRadius: 14, borderWidth: 1, borderColor: "#302443", padding: 14, marginBottom: 10 },
  moduleHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  moduleInfo: { flex: 1 },
  moduleName: { color: "#FFF", fontSize: 13, fontWeight: "800" },
  moduleDescription: { color: "#91889F", fontSize: 10, marginTop: 4 },
  star: { color: "#C69BFF", fontSize: 21 },
  status: { color: "#C69BFF", fontSize: 8, fontWeight: "900", marginTop: 8 },
  settings: { borderTopWidth: 1, borderTopColor: "#352844", marginTop: 12, paddingTop: 12 },
  settingsTitle: { color: "#B889FF", fontSize: 9, fontWeight: "900", marginBottom: 12 },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  settingLabel: { color: "#D7CDE5", fontSize: 10, fontWeight: "700" },
  controls: { flexDirection: "row", gap: 8 },
  smallButton: { backgroundColor: "#493064", borderRadius: 7, paddingHorizontal: 13, paddingVertical: 5 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "900" },
  canvas: { height: 250, backgroundColor: "#100D19", borderWidth: 1, borderColor: "#49365E", borderRadius: 13, marginVertical: 15, position: "relative", overflow: "hidden" },
  widget: { position: "absolute", backgroundColor: "#261B36", borderWidth: 1, borderRadius: 7, padding: 9 },
  widgetText: { color: "#F1E8FF", fontSize: 10, fontWeight: "900" },
  moveControls: { flexDirection: "row", justifyContent: "center", gap: 12, marginVertical: 15 },
  moveButton: { backgroundColor: "#493064", borderRadius: 9, padding: 13, minWidth: 45, alignItems: "center" },
  reset: { backgroundColor: "#382253", borderRadius: 9, padding: 13, alignItems: "center" },
  footer: { alignItems: "center", marginTop: 30 },
  footerTitle: { color: "#B889FF", fontSize: 13, fontWeight: "900", letterSpacing: 3 },
  footerText: { color: "#82798F", fontSize: 9, marginTop: 5 },
  disclaimer: { color: "#716A7D", fontSize: 8, lineHeight: 14, textAlign: "center", marginTop: 10 },
});
