import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../backendFiles/colors";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import fontSizeadj from "../backendFiles/fontSizeadj";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameSaved, setUserNameSaved] = useState(false);

  const saveData = () => {
    if (userName.length > 0) {
      setUserNameSaved(true);
    }
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        width: "100%",
        height: "100%",
        paddingHorizontal: windowWidth * 0.08,
      }}
    >
      <View style={styles.logo}>
        <View>
          <AntDesign
            name="menu-fold"
            size={20}
            color={colors.extra}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <Image
          style={{ width: 70, height: 70 }}
          source={require("../images/logo.png")}
        />
        <View>
          <AntDesign
            name="reload1"
            size={20}
            color={colors.extra}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
      <View style={styles.bottomLogo}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: fontSizeadj(0.035) }}>Backup Data</Text>
            <Switch
              trackColor={{ false: colors.buttons, true: colors.buttons }}
              thumbColor={"white"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style={{ marginVertical: windowHeight * 0.01 }}>
            <Text style={{ fontSize: fontSizeadj(0.035) }}>Volume</Text>
            <Slider
              minimumValue={0}
              maximumValue={100}
              style={{ marginVertical: windowHeight * 0.01 }}
              thumbTintColor={colors.buttons}
            />
          </View>

          <View style={{ marginVertical: windowHeight * 0.01 }}>
            <Text>
              Username
              {userNameSaved && <Text>( Current Username : {userName} )</Text>}
            </Text>
            <TextInput
              placeholder="Enter Username"
              onChangeText={(text) => {
                setUserName(text);
              }}
            />
          </View>

          <View style={{ marginVertical: windowHeight * 0.01 }}>
            <Text>Choose Option</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderWidth: 1,
                  padding: 5,
                  marginVertical: windowHeight * 0.01,
                }}
              >
                <Text>Option A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderWidth: 1, padding: 5 }}>
                <Text>Option B</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginVertical: windowHeight * 0.02 }}>
            <Text>Select Items</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: windowHeight * 0.01,
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 10, borderWidth: 1, padding: 5 }}
              >
                <Text>Item 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 10, borderWidth: 1, padding: 5 }}
              >
                <Text>Item 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderWidth: 1, padding: 5 }}>
                <Text>Item 3</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.buttons,
              paddingVertical: windowHeight * 0.018,
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => saveData()}
          >
            <Text style={{ color: "white" }}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomLogo: {
    flex: 0.85,
  },
});
export default SettingsScreen;
