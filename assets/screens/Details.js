import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  ToastAndroid,
  Platform,
  LayoutAnimation,
  Modal,
} from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../backendFiles/colors";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { Ionicons } from "@expo/vector-icons";
import coffee from "../backendFiles/coffee.json";
import { useNavigation } from "@react-navigation/native";
import Comp_CartExtras from "../screens/Comp_CartExtras";
import { addFav } from "../backendFiles/addFav";
import { getFavData } from "../backendFiles/getFavData";
import { removeFav } from "../backendFiles/removeFav";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Details({ route }) {
  const fetchCart = route.params.fetchCart;
  const idItem = route.params.idItem;
  const itemData = coffee.find((item) => item.id === idItem);
  const navigate = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(windowHeight);
  const [drawerValid, setDrawerValid] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    function notifyMessage(msg) {
      if (Platform.OS === "android") {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      }
    }
    notifyMessage("Swipe down to go back");
  }, []);

  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  }

  const openDrawer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDrawerOpen(windowHeight * 0.15);
    setDrawerValid(true);
  };
  const closeDrawer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDrawerOpen(windowHeight);
    setDrawerValid(false);
  };
  const favClicked = (itemID) => {
    if (isFav) {
      removeFav(itemID);
      setIsFav(false);
    } else {
      addFav(itemID);
      setIsFav(true);
    }
  };

  useEffect(() => {
    async function existFav() {
      const currFav = await getFavData();
      const existFav = Array.isArray(currFav) && currFav.includes(itemData.id);
      if (existFav) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
    existFav();
  }, []);

  return (
    <View
      style={styles.containerDetails}
      onTouchStart={(e) => (this.touchY = e.nativeEvent.pageY)}
      onTouchEnd={(e) => {
        if (e.nativeEvent.pageY - touchY > 100) {
          navigate.navigate("mainPage");
        }
      }}
    >
      <View style={styles.itemPicture}>
        <Image
          style={styles.preview}
          source={{ uri: itemData.image_link }}
        ></Image>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.itemDetailTop}>
          <Text style={styles.heading}>{itemData.name}</Text>
          <Text style={styles.price}>${itemData.cost}</Text>
        </View>
        <View style={styles.itemDetailMiddle}>
          <Text style={styles.itemType}>{itemData.type}</Text>
        </View>
        <View style={styles.itemDetailBottom}>
          <Text style={styles.ratings}>
            <View>
              <Ionicons name="star" size={25} color={colors.buttons} />
            </View>
          </Text>
          <View style={styles.ratingTextContainer}>
            <Text style={{ color: "white" }}>4.5 (5,2523)</Text>
          </View>
          <TouchableHighlight
            onPress={() => {
              openDrawer();
            }}
          >
            <View style={styles.addToCart}>
              <Text style={styles.cartText}>Add to cart</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.itemDescription}>
        <Text style={styles.headingDesc}>Description</Text>
        <Text style={styles.DescDesc}>{itemData.description}</Text>
      </View>
      <TouchableHighlight>
        <View style={styles.buyButton}>
          <Text style={styles.buttonBuyNow}>Buy now</Text>
        </View>
      </TouchableHighlight>

      <Modal
        visible={drawerValid}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDrawer}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: colors.secondary,
            flex: 0.8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: "auto",
          }}
        >
          <View
            style={{
              backgroundColor: colors.highlight,
              width: "100%",
              height: windowHeight * 0.1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: windowWidth * 0.05,
              gap: windowWidth * 0.03,
            }}
          >
            <Image
              source={{ uri: itemData.image_link }}
              style={{ width: 52, height: 50, borderRadius: 50 }}
            />
            <Text
              style={{
                fontSize: fontSizeadj(0.04),
                fontWeight: "bold",
                marginRight: "auto",
                color: colors.buttons,
              }}
            >
              {itemData.name}
            </Text>
            <TouchableHighlight>
              <Ionicons
                size={25}
                name={isFav ? "heart" : "heart-outline"}
                color={colors.buttons}
                onPress={() => {
                  favClicked(itemData.id);
                }}
              />
            </TouchableHighlight>
            <TouchableHighlight>
              <Ionicons size={25} name="share-outline" color={colors.buttons} />
            </TouchableHighlight>
          </View>
          <Comp_CartExtras
            itemData={itemData}
            setDrawerValid={setDrawerValid}
            notifyMessage={notifyMessage}
            fetchCart={fetchCart}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.extra,
    paddingBottom: windowHeight * 0.04,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 0,
  },
  itemPicture: {
    flex: 0.4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  preview: {
    width: 240,
    height: 240,
    marginTop: windowHeight * 0.01,
    resizeMode: "cover",
    borderRadius: 140,
  },
  itemDetails: {
    flex: 0.25,
    backgroundColor: colors.extra,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: windowWidth * 0.07,
  },
  itemDetailTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: windowHeight * 0.03,
  },
  heading: {
    color: "white",
    fontSize: fontSizeadj(0.05),
    width: "70%",
  },
  price: {
    color: colors.buttons,
    fontWeight: "bold",
    fontSize: fontSizeadj(0.05),
  },
  itemType: {
    color: "rgba(255,255,255,0.6)",
    fontSize: fontSizeadj(0.03),
    marginTop: windowHeight * 0.01,
  },
  itemDetailBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: windowHeight * 0.03,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingTextContainer: {
    marginRight: "auto",
    marginLeft: windowWidth * 0.03,
  },
  addToCart: {
    backgroundColor: colors.buttons,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.04,
    borderRadius: 8,
  },
  cartText: {
    fontSize: fontSizeadj(0.03),
  },
  itemDescription: {
    flex: 0.2,
  },
  headingDesc: {
    fontSize: fontSizeadj(0.05),
    fontWeight: "bold",
    marginTop: windowHeight * 0.01,
  },
  DescDesc: {
    fontSize: fontSizeadj(0.032),
    marginTop: windowHeight * 0.01,
  },
  buyButton: {
    backgroundColor: colors.extra,
    alignItems: "center",
    paddingVertical: windowHeight * 0.03,
    marginTop: "auto",
    borderRadius: 20,
  },
  buttonBuyNow: {
    color: colors.buttons,
    fontSize: fontSizeadj(0.035),
  },
  containerDetails: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    flex: 1,
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  icons: {
    height: "100%",
    width: "25%",
    opacity: 0.7,
  },
  Comp_userControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Details;
