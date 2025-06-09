import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticFeedback?: boolean;
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  hapticFeedback = true,
  gradient = false,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;

    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onPress();
  };

  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const renderContent = () => (
    <View style={styles.content}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : "#3B82F6"}
          style={styles.loader}
        />
      )}
      {icon && iconPosition === "left" && !loading && (
        <View style={styles.iconLeft}>{icon}</View>
      )}
      <Text style={textStyles}>{title}</Text>
      {icon && iconPosition === "right" && !loading && (
        <View style={styles.iconRight}>{icon}</View>
      )}
    </View>
  );

  if (gradient && variant === "primary" && !disabled) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        style={[styles.button, styles[size], style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  loader: {
    marginRight: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  // Variants
  primary: {
    backgroundColor: "#3B82F6",
  },
  secondary: {
    backgroundColor: "#F3F4F6",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#3B82F6",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: "#EF4444",
  },

  // Text variants
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#374151",
  },
  outlineText: {
    color: "#3B82F6",
  },
  ghostText: {
    color: "#3B82F6",
  },
  dangerText: {
    color: "#FFFFFF",
  },

  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
