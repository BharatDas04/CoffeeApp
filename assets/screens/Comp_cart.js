import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Image,
} from "react-native";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { useState } from "react";
import { getCartItems } from "../backendFiles/getCartItems";
import coffee from "../backendFiles/coffee.json";
import { colors } from "../backendFiles/colors";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Comp_cart() {
  const [currCart, setCurrCart] = useState(null);
  const [currKeys, setCurrKeys] = useState(null);
  const [selectCart, setSelectCart] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, keys } = await getCartItems();
      setCurrCart(data);
      setCurrKeys(keys);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currKeys != null) {
      const filteredData = coffee.filter((item) =>
        currKeys.includes(item.id.toString())
      );
      setSelectCart(filteredData);
      const updatedFilteredData = filteredData.map((item) => {
        const quantity = currCart[item.id] || 0;
        return {
          ...item,
          quantity: quantity,
        };
      });
      setSelectCart(updatedFilteredData);
    }
  }, [currKeys]);
  const navigation = useNavigation();
  return (
    <View style={styles.cartContainer}>
      <View style={styles.cartTextContainer}>
        <Text style={styles.cartText}>Cart</Text>
      </View>
      <View style={styles.cartItemContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.values(selectCart).map((item, index) => (
            <View style={styles.cartItems} key={index}>
              <View style={styles.cartItemImage}>
                <Image
                  style={styles.cartImage}
                  source={{ uri: item.image_link }}
                ></Image>
              </View>
              <View style={styles.cartItemText}>
                <Text
                  style={{
                    color: colors.extra,
                    fontWeight: "bold",
                    marginRight: "auto",
                    fontSize: fontSizeadj(0.024),
                    width: windowWidth * 0.15,
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <View style={styles.cartItemAmount}>
                <View>
                  <Text
                    style={{
                      color: colors.extra,
                      fontWeight: "bold",
                      marginRight: "auto",
                      fontSize: fontSizeadj(0.024),
                    }}
                  >
                    $ {item.cost * item.quantity}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: colors.extra,
                      fontWeight: "bold",
                      marginRight: "auto",
                      fontSize: fontSizeadj(0.024),
                    }}
                  >
                    Q: {item.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.cartItemButton}>
        <TouchableHighlight
          onPress={() => navigation.navigate("Cart")}
          underlayColor={colors.accent}
        >
          <Text style={{ color: "black" }}>View Cart</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: windowHeight * 0.005,
  },
  cartTextContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    width: "80%",
  },
  cartItemContainer: {
    flex: 0.75,
    maxHeight: "100%",
  },
  cartItemButton: {
    backgroundColor: colors.primary,
    paddingVertical: windowHeight * 0.01,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: "auto",
    flex: 0.1,
    justifyContent: "center",
  },
  cartText: {
    color: "white",
    fontSize: fontSizeadj(0.04),
  },
  cartItems: {
    backgroundColor: colors.primary,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.05,
    marginTop: windowHeight * 0.01,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemImage: {
    flex: 0.3,
  },
  cartImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  cartItemText: {
    flex: 0.5,
    flexDirection: "column",
  },
  cartItemAmount: {
    flex: 0.2,
  },
});

export default Comp_cart;
