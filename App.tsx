
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

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    if (showIntro) {
      fade.setValue(0);
      scale.setValue(0.92);

      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          tension: 35,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showIntro, fade, scale]);

  const toggleItem = (name: string) => {
    setEnabled((old) => ({
      ...old,
      [name]: !old[name],
    }));
  };

  const comingSoon = (name: string) => {
    Alert.alert("Coming Soon", `${name} is not implemented yet.`);
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
        <Text style={styles.homeLogo}>ORBIT</Text>
        <Text style={styles.tagline}>BEYOND VANILLA.</Text>
        <Text style={styles.muted}>
          Your Minecraft Bedrock companion.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={launchMinecraft}
        >
          <Text style={styles.primaryButtonText}>
            LAUNCH MINECRAFT
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>MANAGE YOUR GAME</Text>

      <View style={styles.menuGrid}>
        {sections.map((section) => (
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
          Cosmetics, capes, and pets are intended for compatible
          ORBIT users.
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
              Manage your Minecraft add-ons and behavior packs.
            </Text>
            <Item name="Behavior Packs" description="Manage behavior packs" />
            <Item name="World Add-ons" description="Add-ons assigned to worlds" />
            <Action label="+ IMPORT ADD-ON" onPress={() => comingSoon("Add-on importing")} />
            <Text style={styles.note}>Pack importing is not implemented yet.</Text>
          </>
        );

      case "Texture Packs":
        return (
          <>
            <Text style={styles.sectionTitle}>TEXTURE PACKS</Text>
            <Text style={styles.muted}>Manage your resource packs.</Text>
            <Item name="Resource Packs" description="Manage installed resource packs" />
            <Item name="ORBIT Essentials" description="ORBIT texture pack preview" />
            <Action label="+ IMPORT TEXTURE PACK" onPress={() => comingSoon("Texture pack importing")} />
          </>
        );

      case "Cosmetics":
        return (
          <>
            <Text style={styles.sectionTitle}>COSMETICS</Text>
            <Text style={styles.muted}>Customize your ORBIT character.</Text>
            <Item name="Halo" description="Floating halo accessory" />
            <Item name="Headwear" description="Hats and head accessories" />
            <Item name="Bandanas" description="Wearable bandanas" />
            <Item name="Tails" description="Character tail accessories" />
            <Item name="Wings" description="Decorative wings" />
            <Item name="Other Accessories" description="More cosmetic items" />
            <Text style={styles.note}>
              These are previews. In-game rendering requires compatible
              Minecraft integration.
            </Text>
          </>
        );

      case "Capes":
        return (
          <>
            <Text style={styles.sectionTitle}>ORBIT CAPES</Text>
            <Text style={styles.muted}>Capes are separate from cosmetics.</Text>
            <Item name="ORBIT Cape" description="Classic ORBIT cape" />
            <Item name="Nebula Cape" description="Nebula-themed cape" />
            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.itemTitle}>Cape Physics</Text>
                <Text style={styles.muted}>Enable cape movement preview</Text>
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
            <Item name="Companion Pet" description="Your personal companion" />
            <Item name="Cosmic Fox" description="A space-themed fox" />
            <Item name="Mini Dragon" description="A small dragon companion" />
            <Text style={styles.note}>
              Pets are designed to walk beside the player, not sit on
              their shoulder. In-game behavior is not implemented yet.
            </Text>
          </>
        );

      case "World Manager":
        return (
          <>
            <Text style={styles.sectionTitle}>WORLD MANAGER</Text>
            <Text style={styles.muted}>Organize your Minecraft worlds.</Text>
            <Action label="VIEW WORLDS" onPress={() => comingSoon("World list")} />
            <Action label="BACK UP WORLDS" onPress={() => comingSoon("World backup")} />
            <Action label="IMPORT WORLD" onPress={() => comingSoon("World import")} />
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
                ORBIT sign-in is not available yet. Microsoft
                authentication has not been implemented.
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
        <StatusBar barStyle="light-content" backgroundColor="#080611" />

        <View style={styles.intro}>
          <Animated.View
            style={[
              styles.introContent,
              {
                opacity: fade,
                transform: [{ scale }],
              },
            ]}
          >
            <View style={styles.emblem}>
              <View style={styles.emblemCore} />
              <View style={styles.orbitRingOne} />
              <View style={styles.orbitRingTwo} />
              <View style={styles.orbitDot} />
            </View>

            <Text style={styles.introLogo}>ORBIT</Text>
            <Text style={styles.introTagline}>BEYOND VANILLA.</Text>

            <View style={styles.introDivider} />

            <Text style={styles.introSubtitle}>
              A NEW WAY TO PLAY.
            </Text>

            <TouchableOpacity
              style={styles.getStarted}
              onPress={() => setShowIntro(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.getStartedText}>GET STARTED</Text>
              <Text style={styles.getStartedArrow}>→</Text>
            </TouchableOpacity>

            <Text style={styles.introFooter}>
              ORBIT CLIENT  /  BEDROCK EDITION
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#080611" />

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
            <Text style={styles.backText}>‹  BACK TO HOME</Text>
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

function Action({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#080611",
  },
  intro: {
    flex: 1,
    backgroundColor: "#080611",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  introContent: {
    width: "100%",
    alignItems: "center",
  },
  emblem: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  emblemCore: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#a77aff",
    borderWidth: 8,
    borderColor: "#39245e",
  },
  orbitRingOne: {
    position: "absolute",
    width: 135,
    height: 55,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#a77aff",
    transform: [{ rotate: "-35deg" }],
  },
  orbitRingTwo: {
    position: "absolute",
    width: 135,
    height: 55,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#6843a3",
    transform: [{ rotate: "35deg" }],
  },
  orbitDot: {
    position: "absolute",
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#ffffff",
    top: 20,
    right: 25,
  },
  introLogo: {
    color: "#ffffff",
    fontSize: 53,
    fontWeight: "900",
    letterSpacing: 12,
    marginLeft: 12,
  },
  introTagline: {
    color: "#b58aff",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 5,
    marginTop: 9,
  },
  introDivider: {
    width: 42,
    height: 2,
    backgroundColor: "#8055db",
    marginTop: 30,
    marginBottom: 22,
  },
  introSubtitle: {
    color: "#d0cadc",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3,
  },
  getStarted: {
    width: "100%",
    height: 58,
    backgroundColor: "#8055db",
    borderRadius: 12,
    marginTop: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  getStartedText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3,
  },
  getStartedArrow: {
    color: "#ffffff",
    fontSize: 20,
  },
  introFooter: {
    color: "#706981",
    fontSize: 9,
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
  homeLogo: {
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
  primaryButton: {
    backgroundColor: "#8055db",
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    letterSpacing: 2,
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
