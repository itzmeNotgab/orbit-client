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

type Category = "HUD" | "Visual" | "Utility" | "Performance" | "Client";

type ModuleItem = {
  id: string;
  name: string;
  description: string;
  category: Category;
  defaultEnabled?: boolean;
};

const categories: Category[] = [
  "HUD",
  "Visual",
  "Utility",
  "Performance",
  "Client",
];

const modules: ModuleItem[] = [
  { id: "fps", name: "FPS Display", description: "Demo switch for a future frame-rate overlay.", category: "HUD", defaultEnabled: true },
  { id: "coords", name: "Coordinates", description: "Demo switch for a future coordinates display.", category: "HUD" },
  { id: "keystrokes", name: "Keystrokes", description: "Demo switch for a future input display.", category: "HUD" },
  { id: "armor", name: "Armor Status", description: "Placeholder for an equipment status widget.", category: "HUD" },
  { id: "clearview", name: "Clear View", description: "A placeholder for supported visual preferences.", category: "Visual" },
  { id: "particles", name: "Particle Control", description: "Demo setting for a future supported particle option.", category: "Visual" },
  { id: "crosshair", name: "Crosshair", description: "Placeholder for a customizable crosshair overlay.", category: "Visual" },
  { id: "quicknotes", name: "Quick Notes", description: "A simple companion-tool concept for gameplay notes.", category: "Utility" },
  { id: "packguide", name: "Pack Guide", description: "Placeholder for resource-pack information and tips.", category: "Utility" },
  { id: "loweffects", name: "Low Effects Preset", description: "A profile label for choosing lighter visual settings.", category: "Performance" },
  { id: "battery", name: "Battery Saver Profile", description: "A reminder/profile control, not a system power tweak.", category: "Performance" },
  { id: "compact", name: "Compact Interface", description: "Use a more compact layout inside this companion app.", category: "Client" },
  { id: "notifications", name: "In-App Notifications", description: "Demo preference for future app notifications.", category: "Client" },
];

const initialEnabled = modules.reduce<Record<string, boolean>>((result, item) => {
  result[item.id] = Boolean(item.defaultEnabled);
  return result;
}, {});

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("HUD");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(initialEnabled);
  const [favorites, setFavorites] = useState<string[]>(["fps"]);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const activeCount = Object.values(enabled).filter(Boolean).length;

  const visibleModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules.filter((item) => {
      const matchesCategory = item.category === selectedCategory;
      const matchesFavorite = !favoritesOnly || favorites.includes(item.id);
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesFavorite && matchesSearch;
    });
  }, [selectedCategory, favoritesOnly, favorites, search]);

  const toggleFavorite = (id: string) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favorite) => favorite !== id)
        : [...previous, id]
    );
  };

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
    setFavoritesOnly(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090713" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>ORBIT</Text>
            <Text style={styles.tagline}>BEYOND VANILLA.</Text>
          </View>

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>READY</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>ORBIT CLIENT • V1.1 PREVIEW</Text>

          <Text style={styles.heading}>Your game.</Text>
          <Text style={styles.heading}>
            Your <Text style={styles.purple}>control.</Text>
          </Text>

          <Text style={styles.description}>
            Your Minecraft Bedrock companion for customization, helpful
            utilities, and performance-minded profiles.
          </Text>

          <View style={styles.heroFooter}>
            <View>
              <Text style={styles.statNumber}>{activeCount}</Text>
              <Text style={styles.statCaption}>ENABLED DEMO MODULES</Text>
            </View>

            <View style={styles.heroDivider} />

            <View>
              <Text style={styles.statNumber}>{modules.length}</Text>
              <Text style={styles.statCaption}>TOTAL MODULES</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>CLICKGUI</Text>
            <Text style={styles.sectionSubtitle}>
              BROWSE YOUR ORBIT MODULES
            </Text>
          </View>

          <Pressable
            onPress={() => setFavoritesOnly((value) => !value)}
            style={[
              styles.favoriteFilter,
              favoritesOnly && styles.favoriteFilterActive,
            ]}
          >
            <Text
              style={[
                styles.favoriteFilterText,
                favoritesOnly && styles.favoriteFilterTextActive,
              ]}
            >
              {favoritesOnly ? "★ FAVORITES" : "☆ FAVORITES"}
            </Text>
          </Pressable>
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search modules..."
          placeholderTextColor="#716A80"
          style={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => {
            const selected = category === selectedCategory;

            return (
              <Pressable
                key={category}
                onPress={() => selectCategory(category)}
                style={[
                  styles.categoryChip,
                  selected && styles.categoryChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.moduleHeader}>
          <Text style={styles.moduleHeaderTitle}>
            {selectedCategory} MODULES
          </Text>
          <Text style={styles.moduleCount}>
            {visibleModules.length} SHOWN
          </Text>
        </View>

        {visibleModules.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No modules found</Text>
            <Text style={styles.emptyText}>
              Try another search or turn off the favorites filter.
            </Text>
          </View>
        ) : (
          visibleModules.map((item) => (
            <View key={item.id} style={styles.moduleCard}>
              <View style={styles.moduleTopRow}>
                <View style={styles.moduleText}>
                  <Text style={styles.moduleName}>{item.name}</Text>
                  <Text style={styles.moduleDescription}>
                    {item.description}
                  </Text>
                </View>

                <Pressable
                  onPress={() => toggleFavorite(item.id)}
                  hitSlop={10}
                  style={styles.starButton}
                >
                  <Text style={styles.star}>
                    {favorites.includes(item.id) ? "★" : "☆"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.moduleBottomRow}>
                <View style={styles.moduleStatus}>
                  <View
                    style={[
                      styles.moduleStatusDot,
                      enabled[item.id] && styles.moduleStatusDotEnabled,
                    ]}
                  />

                  <Text
                    style={[
                      styles.moduleStatusText,
                      enabled[item.id] && styles.moduleStatusTextEnabled,
                    ]}
                  >
                    {enabled[item.id] ? "ENABLED" : "DISABLED"}
                  </Text>
                </View>

                <Switch
                  value={Boolean(enabled[item.id])}
                  onValueChange={(value) =>
                    setEnabled((previous) => ({
                      ...previous,
                      [item.id]: value,
                    }))
                  }
                  trackColor={{ false: "#393244", true: "#8B50E8" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          ))
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>CONFIGURATION</Text>
          <Text style={styles.infoText}>
            Module switches and favorites work inside this app for this
            session. Persistent saving and real Minecraft integration are
            planned for later versions.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>ORBIT CLIENT</Text>
          <Text style={styles.footerText}>
            BEYOND VANILLA. • V1.1 PREVIEW
          </Text>
          <Text style={styles.disclaimer}>
            These are companion-app demo controls. They do not modify
            Minecraft, inject code, or bypass game protections.
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
    padding: 20,
    paddingBottom: 42,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
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
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14251F",
    borderColor: "#244A39",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#65E6A5",
  },
  statusText: {
    color: "#8CE8B7",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  hero: {
    backgroundColor: "#151122",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#302443",
    marginBottom: 28,
  },
  eyebrow: {
    color: "#A56BFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.7,
    marginBottom: 18,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "900",
    lineHeight: 40,
  },
  purple: {
    color: "#B889FF",
  },
  description: {
    color: "#A69DB6",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 13,
  },
  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: "#302443",
    gap: 22,
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
  },
  statCaption: {
    color: "#938AA4",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 3,
  },
  heroDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#3B304B",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: "#8D849D",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginTop: 4,
  },
  favoriteFilter: {
    borderWidth: 1,
    borderColor: "#443653",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  favoriteFilterActive: {
    backgroundColor: "#2A1C3C",
    borderColor: "#A56BFF",
  },
  favoriteFilterText: {
    color: "#B6A9C9",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  favoriteFilterTextActive: {
    color: "#D7BFFF",
  },
  search: {
    backgroundColor: "#151122",
    borderWidth: 1,
    borderColor: "#302443",
    borderRadius: 13,
    color: "#FFFFFF",
    fontSize: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 14,
  },
  categoryRow: {
    gap: 8,
    paddingBottom: 18,
  },
  categoryChip: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#342A43",
    backgroundColor: "#151122",
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  categoryChipSelected: {
    backgroundColor: "#382253",
    borderColor: "#A56BFF",
  },
  categoryText: {
    color: "#A69DB6",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  categoryTextSelected: {
    color: "#E2CEFF",
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  moduleHeaderTitle: {
    color: "#D9D0E8",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  moduleCount: {
    color: "#81778F",
    fontSize: 9,
    fontWeight: "800",
  },
  moduleCard: {
    backgroundColor: "#151122",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#302443",
    padding: 15,
    marginBottom: 10,
  },
  moduleTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  moduleText: {
    flex: 1,
    paddingRight: 10,
  },
  moduleName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  moduleDescription: {
    color: "#91889F",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  starButton: {
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  star: {
    color: "#C69BFF",
    fontSize: 23,
  },
  moduleBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  moduleStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  moduleStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#70677D",
  },
  moduleStatusDotEnabled: {
    backgroundColor: "#A56BFF",
  },
  moduleStatusText: {
    color: "#82798F",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },
  moduleStatusTextEnabled: {
    color: "#C69BFF",
  },
  emptyState: {
    backgroundColor: "#151122",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#302443",
    padding: 22,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  emptyText: {
    color: "#91889F",
    fontSize: 11,
    textAlign: "center",
    marginTop: 7,
  },
  infoCard: {
    backgroundColor: "#171321",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3A2B4D",
    padding: 16,
    marginTop: 12,
  },
  infoTitle: {
    color: "#C69BFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  infoText: {
    color: "#A69DB6",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 7,
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
  },
  footerBrand: {
    color: "#B889FF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
  },
  footerText: {
    color: "#82798F",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 7,
  },
  disclaimer: {
    color: "#716A7D",
    fontSize: 9,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 280,
  },
});
