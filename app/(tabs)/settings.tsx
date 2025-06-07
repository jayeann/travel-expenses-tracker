"use client";

import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { reset } from "../../store/counterSlice";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>App Settings</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch value={darkModeEnabled} onValueChange={setDarkModeEnabled} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Redux Actions</Text>
        <Text style={styles.description}>Current counter value: {count}</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.resetButtonText}>Reset Counter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>App Information</Text>
        <Text style={styles.infoText}>Version: 1.0.0</Text>
        <Text style={styles.infoText}>Developed by: teenyjaye</Text>
        <Text style={styles.infoText}>Developed year: Jun 2025</Text>
        <Text style={styles.infoText}>Built with Expo Router & Redux</Text>
        <Text style={styles.infoText}>TypeScript enabled</Text>

        {/* External Links */}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            onPress={() => handleLinkPress("https://example.com/privacy")}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLinkPress("https://example.com/terms")}
          >
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLinkPress("mailto:support@example.com")}
          >
            <Text style={styles.linkText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Optional - Legal and License Information */}
        <View style={styles.legalContainer}>
          <Text style={styles.infoText}>License: MIT License</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
  },
  resetButton: {
    backgroundColor: "#FF9500",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  linksContainer: {
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    marginVertical: 5,
  },
  legalContainer: {
    marginTop: 10,
  },
});
