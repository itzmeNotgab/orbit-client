
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Section =
  | "Home"
  | "Add-ons"
  | "Texture Packs"
  | "Cosmetics"
  | "Capes"
  | "Pets"
  | "World Manager"
  | "Sign In";

const sections: Section[] = [
  "Home",
  "Add-ons",
  "Texture Packs",
  "Cosmetics",
  "Capes",
  "Pets",
  "World Manager",
  "Sign In",
];

export default function App() {
  const [page, setPage] = useState<Section>("Home");
  const [showIntro, setShowIntro] = useState(true);
  const [capePhysics, setCapePhysics] = useState(true);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 35,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const toggleItem = (name: string) => {
    setEnabled((old) => ({
      ...old,
      [name]: !old[name],
    }));
  };

  const showComingSoon = (feature: string) => {
    Alert.alert(
      "Coming Soon",
      `${feature} is not implemented yet.`
    );
  };

  const launchMinecraft = async () => {
    try {
      await Linking.openURL("minecraft://");
    } catch {
      Alert.alert(
        "Minecraft not found",
        "Please install Minecraft Bedrock first."
      );
    }
  };

  const Item = ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => (
    <View style={styles.item}>
      <View style={styles.itemText}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.muted}>{description}</Text>
      </View>
      <Switch
        value={!!enabled[name]}
        onValueChange={() => toggleItem(name)}
        trackColor={{ false: "#383348", true: "#8055db" }}
        thumbColor="#ffffff"
      />
    </View>
  );

  const renderHome = () => (
    <>
      <View style={styles.hero}>
        <Text style={styles.logo}>ORBIT</Text>
        <Text style={styles.tagline}>BEYOND VANILLA.</Text>
        <Text style={styles.muted}>
          Your Minecraft Bedrock companion.
        </Text>

        <TouchableOpacity
          style={styles.launchButton}
          onPress={launchMinecraft}
        >
          <Text style={styles.launchText}>
            ▶  LAUNCH MINECRAFT
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>MANAGE YOUR GAME</Text>

      <View style={styles.menuGrid}>
        {sections.slice(1).map((section) => (
          <TouchableOpacity
            key={section}
            style={styles.menuCard}
            onPress={() => setPage(section)}
          >
            <Text style={styles.menuCardTitle}>{section}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>ORBIT EXCLUSIVE</Text>
        <Text style={styles.muted}>
          ORBIT cosmetics, capes, and pets are designed to be
          visible only to compatible ORBIT users.
        </Text>
      </View>
    </>
  );

  const renderPage = () => {
    switch (page) {
      case "Home":
        return renderHome();

      case "Add-ons":
        return (
          <>
            <Text style={styles.sectionTitle}>ADD-ON MANAGER</Text>
            <Text style={styles.muted}>
              Manage Minecraft add-ons and behavior packs.
            </Text>

            <Item
              name="Behavior Packs"
              description="Manage behavior packs"
            />
            <Item
              name="World Add-ons"
              description="Add-ons assigned to worlds"
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showComingSoon("Add-on importing")}
            >
              <Text style={styles.actionText}>+ IMPORT ADD-ON</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              Pack importing and installation are not implemented yet.
            </Text>
          </>
        );

      case "Texture Packs":
        return (
          <>
            <Text style={styles.sectionTitle}>TEXTURE PACKS</Text>
            <Text style={styles.muted}>
              Manage your Minecraft resource packs.
            </Text>

            <Item
              name="Resource Packs"
              description="Manage installed resource packs"
            />
            <Item
              name="ORBIT Essentials"
              description="ORBIT texture pack preview"
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showComingSoon("Texture pack importing")}
            >
              <Text style={styles.actionText}>
                + IMPORT TEXTURE PACK
              </Text>
            </TouchableOpacity>
          </>
        );

      case "Cosmetics":
        return (
          <>
            <Text style={styles.sectionTitle}>COSMETICS</Text>
            <Text style={styles.muted}>
              Customize your ORBIT character.
            </Text>

            <Item name="Halo" description="Floating halo accessory" />
            <Item name="Headwear" description="Hats and head accessories" />
            <Item name="Tails" description="Character tail accessories" />
            <Item name="Wings" description="Decorative character wings" />
            <Item
              name="Other Accessories"
              description="More cosmetic items"
            />

            <Text style={styles.note}>
              These are previews. In-game rendering requires
              compatible Minecraft integration.
            </Text>
          </>
        );

      case "Capes":
        return (
          <>
            <Text style={styles.sectionTitle}>ORBIT CAPES</Text>
            <Text style={styles.muted}>
              Capes have their own section, separate from cosmetics.
            </Text>

            <Item name="ORBIT Cape" description="Classic ORBIT cape" />
            <Item name="Nebula Cape" description="Nebula-themed cape" />

            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.itemTitle}>Cape Physics</Text>
                <Text style={styles.muted}>
                  Enable cape movement preview
                </Text>
              </View>
              <Switch
                value={capePhysics}
                onValueChange={setCapePhysics}
                trackColor={{ false: "#383348", true: "#8055db" }}
                thumbColor="#ffffff"
              />
            </View>

            <Text style={styles.note}>
              Cape physics and in-game rendering are not implemented yet.
            </Text>
          </>
        );

      case "Pets":
        return (
          <>
            <Text style={styles.sectionTitle}>ORBIT PETS</Text>
            <Text style={styles.muted}>
              Choose a companion to walk beside your character.
            </Text>

            <Item
              name="Companion Pet"
              description="Your personal companion"
            />
            <Item
              name="Cosmic Fox"
              description="A space-themed fox"
            />
            <Item
              name="Mini Dragon"
              description="A small dragon companion"
            />

            <Text style={styles.note}>
              Pets are designed to walk beside the player,
              not sit on their shoulder. In-game behavior
              is not implemented yet.
            </Text>
          </>
        );

      case "World Manager":
        return (
          <>
            <Text style={styles.sectionTitle}>WORLD MANAGER</Text>
            <Text style={styles.muted}>
              Organize and manage your Minecraft worlds.
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showComingSoon("World list")}
            >
              <Text style={styles.actionText}>VIEW WORLDS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showComingSoon("World backup")}
            >
              <Text style={styles.actionText}>BACK UP WORLDS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showComingSoon("World import")}
            >
              <Text style={styles.actionText}>IMPORT WORLD</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              World access depends on Android storage permissions.
            </Text>
          </>
        );

      case "Sign In":
        return (
          <>
            <Text style={styles.sectionTitle}>ORBIT ACCOUNT</Text>
            <Text style={styles.muted}>
              Sign in to access ORBIT-exclusive features.
            </Text>

            <View style={styles.notice}>
              <Text style={styles.noticeTitle}>ACCOUNT SYSTEM</Text>
              <Text style={styles.muted}>
                ORBIT account sign-in is not available yet.
                Microsoft authentication has not been implemented.
              </Text>
            </View>

            <Text style={styles.note}>
              Never enter your Microsoft password into an unofficial form.
            </Text>
          </>
        );
    }
  };

  if (showIntro) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#090713"
        />

        <View style={styles.introBackground}>
          <Animated.View
            style={[
              styles.introContent,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.orbitSymbol}>
              <Text style={styles.orbitIcon}>◎</Text>
            </View>

            <Text style={styles.introLogo}>ORBIT</Text>
            <Text style={styles.tagline}>BEYOND VANILLA.</Text>

            <Text style={styles.introDescription}>
              YOUR WORLD. YOUR EXPERIENCE.
            </Text>

            <TouchableOpacity
              style={styles.launchButton}
              onPress={() => setShowIntro(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.launchText}>
                ENTER ORBIT  →
              </Text>
            </TouchableOpacity>

            <Text style={styles.introFooter}>
              ORBIT CLIENT • BEDROCK EDITION
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090713"
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setPage("Home")}>
          <Text style={styles.headerLogo}>ORBIT</Text>
        </TouchableOpacity>
        <Text style={styles.headerLabel}>BEYOND VANILLA</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {page !== "Home" && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setPage("Home")}
          >
            <Text style={styles.backText}>
              ‹  BACK TO HOME
            </Text>
          </TouchableOpacity>
        )}

        {renderPage()}

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>ORBIT CLIENT</Text>
          <Text style={styles.muted}>BEYOND VANILLA.</Text>
          <Text style={styles.note}>
            Launcher preview. In-game features require compatible
            Minecraft integration. Gameplay modules belong inside
            Minecraft, not in this launcher.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#090713",
  },
  introBackground: {
    flex: 1,
    backgroundColor: "#090713",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  introContent: {
    width: "100%",
    alignItems: "center",
  },
  orbitSymbol: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#8055db",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    backgroundColor: "#171027",
  },
  orbitIcon: {
    color: "#c5a8ff",
    fontSize: 75,
    fontWeight: "300",
  },
  introLogo: {
    color: "#ffffff",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: 10,
  },
  introDescription: {
    color: "#aaa4b9",
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 30,
  },
  introFooter: {
    color: "#706981",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 65,
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#292238",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLogo: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 3,
  },
  headerLabel: {
    color: "#9874dc",
    fontSize: 10,
    letterSpacing: 2,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 42,
  },
  logo: {
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 8,
  },
  tagline: {
    color: "#a982f5",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 5,
    marginTop: 5,
    marginBottom: 12,
  },
  muted: {
    color: "#aaa4b9",
    fontSize: 13,
    lineHeight: 20,
  },
  launchButton: {
    backgroundColor: "#8055db",
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  launchText: {
    color: "#ffffff",
    fontWeight: "900",
    letterSpacing: 1,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 12,
  },
  menuGrid: {
    gap: 10,
    marginTop: 12,
  },
  menuCard: {
    backgroundColor: "#171323",
    borderWidth: 1,
    borderColor: "#302641",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuCardTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  menuArrow: {
    color: "#a982f5",
    fontSize: 25,
  },
  notice: {
    backgroundColor: "#1b1530",
    borderWidth: 1,
    borderColor: "#59417f",
    padding: 17,
    borderRadius: 12,
    marginTop: 25,
    gap: 8,
  },
  noticeTitle: {
    color: "#b997ff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  item: {
    backgroundColor: "#171323",
    borderWidth: 1,
    borderColor: "#302641",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    flex: 1,
    paddingRight: 12,
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  actionButton: {
    backgroundColor: "#241b36",
    borderWidth: 1,
    borderColor: "#8055db",
    borderRadius: 10,
    padding: 16,
    marginTop: 12,
    alignItems: "center",
  },
  actionText: {
    color: "#c5a8ff",
    fontWeight: "800",
    letterSpacing: 1,
  },
  note: {
    color: "#817a91",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 15,
  },
  backButton: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  backText: {
    color: "#b997ff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#292238",
    marginTop: 40,
    paddingTop: 20,
    alignItems: "center",
  },
  footerLogo: {
    color: "#ffffff",
    fontWeight: "900",
    letterSpacing: 3,
  },
});
