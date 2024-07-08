import { View } from "react-native";
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import Comp_TopContainer from "./Comp_TopContainer";
import Comp_BottomContainer from "./Comp_BottomContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "../screens/Details";
import { useState, useEffect } from "react";
import cartCount from "../backendFiles/cartCount";
import addToCart from "../backendFiles/addToCart";
import { LogBox } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../backendFiles/colors";
import SettingsScreen from "../screens/SettingsScreen";
import CustomerService from "../screens/CustomerService";
import Comp_cart from "../screens/Comp_cart";
import CartScreen from "../screens/CartScreen";
import { useIsFocused } from "@react-navigation/native";
import FavouriteScreen from "./FavouriteScreen";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const Drawer = createDrawerNavigator();

function MainStackNavigator() {
  const Stack = createStackNavigator();
  const [count, setCount] = useState(0);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCartNumber() {
      setCount(await cartCount());
    }
    fetchCartNumber();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchCartNumber() {
      setCount(await cartCount());
    }
    fetchCartNumber();
  }, [isFocused]);

  async function fetchCart(idOfItem, quan) {
    console.log(quan);
    await addToCart(idOfItem, quan);
    setCount(await cartCount());
  }

  return (
    <View style={styles.innerCon}>
      <View style={styles.topContainer}>
        <Comp_TopContainer count={count} setCartIsOpen={setCartIsOpen} />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setCartIsOpen(false);
        }}
      >
        <View style={styles.bottomContainer}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="mainPage"
              component={Comp_BottomContainer}
              initialParams={{ fetchCart }}
            />
            <Stack.Screen
              name="detailPage"
              component={Details}
              initialParams={{ fetchCart }}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </View>
      </TouchableWithoutFeedback>
      {cartIsOpen && (
        <View style={styles.cart}>
          <Comp_cart />
        </View>
      )}
    </View>
  );
}

function LandingPage() {
  LogBox.ignoreLogs(["Non-serializable"]);
  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: colors.buttons,
            drawerActiveTintColor: "white",
            drawerAllowFontScaling: true,
          }}
        >
          <Drawer.Screen name="Home" component={MainStackNavigator} />
          <Drawer.Screen name="Cart" component={CartScreen} />
          <Drawer.Screen name="Favourites" component={FavouriteScreen} />
          <Drawer.Screen name="Setting" component={SettingsScreen} />
          <Drawer.Screen name="FAQ" component={CustomerService} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  innerCon: {
    width: "100%",
    height: "100%",
    flex: 1,
    paddingHorizontal: "4%",
    paddingTop: windowHeight * 0.01,
    backgroundColor: colors.primary,
    justifyContent: "center",
    width: "100%",
  },
  topContainer: {
    flex: 0.1,
  },
  bottomContainer: {
    flex: 0.9,
  },
  cart: {
    position: "absolute",
    top: "10%",
    right: "15%",
    width: "60%",
    height: "40%",
    backgroundColor: colors.buttons,
    borderRadius: 40,
    borderTopRightRadius: 10,
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.04,
  },
});

export default LandingPage;
