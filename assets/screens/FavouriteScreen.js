import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import { colors } from "../backendFiles/colors";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getFavData } from "../backendFiles/getFavData";
import coffee from "../backendFiles/coffee.json";
import { useIsFocused } from "@react-navigation/native";
import { removeFav } from "../backendFiles/removeFav";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function FavouriteScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [countOfItems, setCountOfItems] = useState(null);
  const [Items, setItems] = useState(null);
  const [finalList, setFinalList] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [noData, setNoData] = useState(true);

  const shareItem = () => {
    const message = finalList.map((item) => item.name).join(", ");
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

  const navigateToDetailPage = (idItem) => {
    navigation.navigate("Home", {
      screen: "detailPage",
      params: {
        idItem: idItem,
      },
    });
  };

  useEffect(() => {
    async function counter() {
      const coun = await getFavData();
      setCountOfItems(coun.length);
      setItems(coun);
    }
    counter();
  }, [isFocused]);

  useEffect(() => {
    if (Items != null) {
      const filteredItems = coffee.filter((item) => Items.includes(item.id));
      setFinalList(filteredItems);
      setIsLoad(false);
      setNoData(false);
      if (Items.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    }
  }, [Items]);

  async function deleteFav(itemid) {
    await removeFav(itemid);
    counter();
  }
  useEffect(() => {
    console.log(noData);
  }, [noData]);

  async function counter() {
    const coun = await getFavData();
    setCountOfItems(coun.length);
    setItems(coun);
  }

  return (
    <View style={styles.backgroundFav}>
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
      <View style={styles.topContainer}>
        <View style={styles.subtotal}>
          <Text style={{ fontSize: fontSizeadj(0.06), fontWeight: "bold" }}>
            Favourites
          </Text>
          <Text style={{ fontSize: fontSizeadj(0.03), fontWeight: "bold" }}>
            {countOfItems} items
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView>
          {!isLoad && noData && (
            <Text
              style={{
                marginTop: "5%",
                fontWeight: "bold",
                fontSize: fontSizeadj(0.04),
              }}
            >
              No favourites yet!
            </Text>
          )}
          {!isLoad &&
            !noData &&
            finalList.map((item, index) => (
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
                        $ {item.cost}
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
                          style={{
                            backgroundColor: colors.buttons,
                            paddingHorizontal: windowWidth * 0.05,
                            paddingVertical: windowHeight * 0.01,
                            borderRadius: 10,
                          }}
                          onPress={() => {
                            deleteFav(item.id);
                          }}
                        >
                          <Text style={{ color: "white" }}>Delete</Text>
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
  );
}

const styles = StyleSheet.create({
  backgroundFav: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    paddingHorizontal: windowWidth * 0.06,
    flex: 1,
  },
  logo: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topContainer: {
    borderBottomWidth: 0.2,
    borderColor: colors.extra,
    paddingBottom: windowHeight * 0.04,
    flex: 0.05,
  },
  bottomContainer: {
    flex: 0.7,
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

export default FavouriteScreen;
