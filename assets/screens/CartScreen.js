import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Linking,
  Share,
} from "react-native";
import { getCartItems } from "../backendFiles/getCartItems";
import { useState, useEffect } from "react";
import coffee from "../backendFiles/coffee.json";
import { colors } from "../backendFiles/colors";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import addToCart from "../backendFiles/addToCart";
import deleteCart from "../backendFiles/deleteCart";
import { useIsFocused } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function CartScreen() {
  const [currCart, setCurrCart] = useState(null);
  const [currKeys, setCurrKeys] = useState(null);
  const [selectCart, setSelectCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [countOfItems, setCountOfItems] = useState(0);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(-windowWidth * 0.25);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const shareItem = () => {
    const message = selectCart.map((item) => item.name).join(", ");
    console.log(message);
    if (message) {
      Share.share({
        message: message,
        url: "bharat",
      })
        .then((result) => {
          if (result.action === Share.sharedAction) {
            console.log("Item shared successfully");
          } else if (result.action === Share.dismissedAction) {
            console.log("Share dismissed");
          }
        })
        .catch((error) =>
          console.error("Error sharing the item:", error.message)
        );
    } else {
      console.error("Error: The item name is undefined or empty.");
    }
  };

  useEffect(() => {
    refresher();
    if (total == 0) {
      setDataAvailable(true);
    } else {
      setDataAvailable(false);
    }
  }, [isFocused]);

  async function refresher() {
    const { data, keys } = await getCartItems();
    setCurrCart(data);
    setCurrKeys(keys);
  }

  useEffect(() => {
    if (currKeys != null) {
      const filteredItems = coffee.filter((item) =>
        currKeys.includes(item.id.toString())
      );

      let subtotal = 0;
      const updatedFilteredItems = filteredItems.map((item) => {
        const quantity = currCart[item.id];
        subtotal += item.cost * quantity;
        return {
          ...item,
          quantity: quantity,
        };
      });

      setSelectCart(updatedFilteredItems);
      setTotal(subtotal);
      setCountOfItems(updatedFilteredItems.length);
    }
  }, [currKeys, currCart]);

  useEffect(() => {
    if (total == 0) {
      setDataAvailable(true);
    } else {
      setDataAvailable(false);
    }
  }, [total]);

  const botOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBottomOpen(bottomOpen === 0 ? -windowWidth * 0.25 : 0);
  };

  async function addFunc(id) {
    await addToCart(id);
    refresher();
  }

  async function deleteFunc(id) {
    await deleteCart(id);
    refresher();
  }

  const navigateToDetailPage = (idItem) => {
    navigation.navigate("Home", {
      screen: "detailPage",
      params: {
        idItem: idItem,
      },
    });
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.outerContainer}>
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
            <TouchableHighlight onPress={shareItem}>
              <AntDesign name="sharealt" size={20} color={colors.extra} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.topContainerInformation}>
          <View style={styles.subtotal}>
            <Text style={{ fontSize: fontSizeadj(0.06), fontWeight: "bold" }}>
              Shopping Cart
            </Text>
            <Text style={{ fontSize: fontSizeadj(0.03), fontWeight: "bold" }}>
              {countOfItems} items
            </Text>
          </View>
        </View>

        <View style={styles.BottomContainerInformation}>
          {dataAvailable && (
            <Text style={{ marginTop: windowHeight * 0.02 }}>
              No Items in cart
            </Text>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectCart.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => navigateToDetailPage(item.id)}
                key={index}
              >
                <View style={styles.items} key={index}>
                  <View style={styles.productImage}>
                    <Image
                      style={{ width: 95, height: 90, borderRadius: 100 }}
                      source={{ uri: item.image_link }}
                    />
                  </View>
                  <View style={styles.productDetails}>
                    <View style={{ flex: 0.5 }}>
                      <Text
                        style={{
                          fontSize: fontSizeadj(0.05),
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: fontSizeadj(0.025),
                          color: "rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {item.type}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          flex: 0.5,
                          fontWeight: "bold",
                          fontSize: fontSizeadj(0.04),
                        }}
                      >
                        ${item.cost * item.quantity}
                      </Text>
                      <View
                        style={{
                          flex: 0.5,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TouchableHighlight
                          underlayColor={colors.buttons}
                          onPress={() => {
                            deleteFunc(item.id);
                          }}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            paddingVertical: windowHeight * 0.01,
                            paddingHorizontal: windowWidth * 0.02,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                          }}
                        >
                          <View>
                            <AntDesign name="minus" />
                          </View>
                        </TouchableHighlight>
                        <View
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            paddingVertical: windowHeight * 0.008,
                            paddingHorizontal: windowWidth * 0.02,
                          }}
                        >
                          <Text>{item.quantity}</Text>
                        </View>
                        <TouchableHighlight
                          underlayColor={colors.buttons}
                          onPress={() => addFunc(item.id)}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            paddingVertical: windowHeight * 0.01,
                            paddingHorizontal: windowWidth * 0.02,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                          }}
                        >
                          <View>
                            <AntDesign name="plus" />
                          </View>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => botOpen()}>
        <View style={[styles.cartTop, { bottom: bottomOpen }]}>
          <View
            style={{
              flex: 0.3,
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: fontSizeadj(0.04) }}>Sub total</Text>
            <Text style={{ fontSize: fontSizeadj(0.04) }}>${total}</Text>
          </View>

          <TouchableHighlight
            style={{ flex: 0.4, width: "100%" }}
            onPress={() => {
              Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            }}
            underlayColor={colors.buttons}
          >
            <View
              style={{
                backgroundColor: colors.buttons,
                width: "100%",
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontSize: fontSizeadj(0.032) }}>
                Check out
              </Text>
            </View>
          </TouchableHighlight>
          <View style={{ flex: 0.3, justifyContent: "center" }}>
            <TouchableHighlight
              onPress={() => navigation.navigate("mainPage")}
              underlayColor={"rgba(255, 255, 255, 0.3)"}
              style={{ borderRadius: 20, padding: 5 }}
            >
              <Text>Continue Shopping</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: windowWidth * 0.06,
  },
  logo: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topContainerInformation: {
    flex: 0.08,
    borderBottomWidth: 1,
    borderColor: colors.extra,
  },
  BottomContainerInformation: {
    flex: 0.7,
  },
  subtotal: {
    flex: 1,
    alignItems: "left",
  },
  items: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: windowHeight * 0.025,
    flex: 1,
  },
  productImage: {
    flex: 0.4,
  },
  productDetails: {
    flex: 0.6,
    alignItems: "left",
    justifyContent: "space-between",
  },
  cartTop: {
    position: "absolute",
    backgroundColor: colors.top,
    width: "100%",
    alignItems: "center",
    height: windowHeight * 0.2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: windowWidth * 0.12,
    paddingTop: windowHeight * 0.027,
    paddingBottom: windowHeight * 0.01,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 10,
  },
});

export default CartScreen;
