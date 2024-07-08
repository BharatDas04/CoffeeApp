import { StatusBar } from "react-native";
import { StyleSheet, View, Platform } from "react-native";
import LandingPage from "../screens/LandingPage";
import { colors } from "../backendFiles/colors";
import Constants from "expo-constants";
import { useState, useEffect } from "react";

function Base() {
  const statusBarHeight = Constants.statusBarHeight;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Platform.OS === "Ios" ? setHeight(statusBarHeight) : setHeight(0);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: height }]}>
      <StatusBar style="light" />
      <LandingPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
  },
});

export default Base;
