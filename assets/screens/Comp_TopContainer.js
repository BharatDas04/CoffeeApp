import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../backendFiles/colors";
import fontSizeadj from "../backendFiles/fontSizeadj";

function Comp_TopContainer({ count, setCartIsOpen }) {
  const navigate = useNavigation();
  return (
    <View style={styles.Comp_container}>
      <View style={styles.Comp_containerOne}>
        <View style={styles.Comp_userControlOne}>
          <TouchableWithoutFeedback onPress={() => navigate.openDrawer()}>
            <Ionicons name="menu-outline" size={30} color="black" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.Comp_userControl}>
          <Image
            style={styles.logo}
            source={require("../images/logo.png")}
          ></Image>
        </View>
        <View style={styles.Comp_userControlTwo}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCartIsOpen(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="cart-outline" size={30} color="black" />
              {count > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{count}</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Comp_container: {
    flex: 1,
    paddingHorizontal: "5%",
    backgroundColor: colors.primary,
  },
  Comp_containerOne: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  Comp_userControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Comp_userControlOne: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  Comp_userControlTwo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icons: {
    height: "50%",
    width: "23%",
    opacity: 0.7,
  },
  iconsOne: {
    height: "100%",
    width: "23%",
    opacity: 0.7,
  },
  logo: {
    height: "100%",
    width: "70%",
    opacity: 0.7,
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: fontSizeadj(0.025),
    fontWeight: "bold",
  },
});
export default Comp_TopContainer;
