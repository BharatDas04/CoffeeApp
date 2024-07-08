import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../backendFiles/colors";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import addToCart from "../backendFiles/addToCart";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Comp_CartExtras({
  itemData,
  setDrawerValid,
  notifyMessage,
  fetchCart,
}) {
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [sizePrice, setSizePrice] = useState(itemData.cost);
  const [large, setLarge] = useState(true);
  const [medium, setMedium] = useState(false);
  const [small, setSmall] = useState(false);
  const [quantity, setQuanitity] = useState(1);
  const [qtotal, setQtotal] = useState(0);

  const sizeSelector = (size) => {
    if (size === "l") {
      setLarge(true);
      setMedium(false);
      setSmall(false);
      setSizePrice(itemData.cost.toFixed(1));
    } else if (size === "m") {
      setLarge(false);
      setMedium(true);
      setSmall(false);
      setSizePrice((itemData.cost - itemData.cost / 3).toFixed(1));
    } else {
      setLarge(false);
      setMedium(false);
      setSmall(true);
      setSizePrice((itemData.cost - itemData.cost / 2).toFixed(1));
    }
  };

  const milkType = (milkT) => {
    if (milkT === "option1") {
      setOption1(true);
      setOption2(false);
      setOption3(false);
      setOption4(false);
    }
    if (milkT === "option2") {
      setOption1(false);
      setOption2(true);
      setOption3(false);
      setOption4(false);
    }
    if (milkT === "option3") {
      setOption1(false);
      setOption2(false);
      setOption3(true);
      setOption4(false);
    }
    if (milkT === "option4") {
      setOption1(false);
      setOption2(false);
      setOption3(false);
      setOption4(true);
    }
  };

  const addQuantity = () => {
    setQuanitity(quantity + 1);
  };

  const removeQuantity = () => {
    if (quantity !== 1) {
      setQuanitity(quantity - 1);
    }
  };

  useEffect(() => {
    setQtotal(quantity * sizePrice);
  }, [quantity, sizeSelector]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 0.95, zIndex: 1 }}>
        <View
          style={{
            backgroundColor: colors.highlight,
            marginVertical: windowHeight * 0.02,
            marginHorizontal: windowWidth * 0.05,
            paddingVertical: windowHeight * 0.02,
            paddingHorizontal: windowWidth * 0.05,
            borderRadius: 10,
            gap: windowHeight * 0.02,
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 0.4,
            }}
          >
            <Text
              style={{
                color: colors.buttons,
                fontSize: fontSizeadj(0.03),
                fontWeight: "bold",
              }}
            >
              Please select the size
            </Text>
            <Text
              style={{
                color: colors.buttons,
                fontSize: fontSizeadj(0.025),
              }}
            >
              Required・Select any 1 option
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableHighlight onPress={() => sizeSelector("l")}>
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor: large ? colors.buttons : colors.highlight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    { color: large ? colors.extra : colors.buttons },
                  ]}
                >
                  Large
                </Text>
                <Text
                  style={[
                    styles.itemText,
                    { color: large ? colors.extra : colors.buttons },
                  ]}
                >
                  {itemData.cost} $
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => sizeSelector("m")}>
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor: medium ? colors.buttons : colors.highlight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    { color: medium ? colors.extra : colors.buttons },
                  ]}
                >
                  Medium
                </Text>
                <Text
                  style={[
                    styles.itemText,
                    { color: medium ? colors.extra : colors.buttons },
                  ]}
                >
                  {(itemData.cost - itemData.cost / 3).toFixed(1)} $
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => sizeSelector("s")}>
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor: small ? colors.buttons : colors.highlight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    { color: small ? colors.extra : colors.buttons },
                  ]}
                >
                  Small
                </Text>
                <Text
                  style={[
                    styles.itemText,
                    { color: small ? colors.extra : colors.buttons },
                  ]}
                >
                  {(itemData.cost - itemData.cost / 2).toFixed(1)} $
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.highlight,
            marginHorizontal: windowWidth * 0.05,
            paddingVertical: windowHeight * 0.02,
            paddingHorizontal: windowWidth * 0.05,
            borderRadius: 10,
            gap: windowHeight * 0.02,
          }}
        >
          <Text style={{ color: colors.buttons, fontWeight: "bold" }}>
            Add a custom message
          </Text>
          <TextInput
            style={{
              width: "100%",
              height: windowHeight * 0.04,
              fontSize: fontSizeadj(0.025),
            }}
            placeholder="Write your message here..."
            placeholderTextColor={colors.buttons}
            backgroundColor={colors.highlight}
            color={colors.buttons}
          />
        </View>
        <View style={styles.optionsAvail}>
          <View style={{ marginBottom: windowHeight * 0.01 }}>
            <Text
              style={{
                color: colors.buttons,
                fontSize: fontSizeadj(0.03),
                fontWeight: "bold",
              }}
            >
              Milk type
            </Text>
            <Text
              style={{
                color: colors.buttons,
                fontSize: fontSizeadj(0.025),
              }}
            >
              Required・Select any 1 option
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => milkType("option1")}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: windowHeight * 0.01,
                }}
              >
                <Text
                  style={{
                    color: colors.buttons,
                    fontSize: fontSizeadj(0.028),
                  }}
                >
                  AltCo Oat Milk
                </Text>
                <View style={styles.selectoutside}>
                  <View
                    style={[
                      styles.selectinside,
                      { display: option1 ? "flex" : "none" },
                    ]}
                  ></View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => milkType("option2")}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: windowHeight * 0.01,
                }}
              >
                <Text
                  style={{
                    color: colors.buttons,
                    fontSize: fontSizeadj(0.028),
                  }}
                >
                  Almond Milk
                </Text>
                <View style={styles.selectoutside}>
                  <View
                    style={[
                      styles.selectinside,
                      { display: option2 ? "flex" : "none" },
                    ]}
                  ></View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => milkType("option3")}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: windowHeight * 0.01,
                }}
              >
                <Text
                  style={{
                    color: colors.buttons,
                    fontSize: fontSizeadj(0.028),
                  }}
                >
                  Slim Milk
                </Text>
                <View style={styles.selectoutside}>
                  <View
                    style={[
                      styles.selectinside,
                      { display: option3 ? "flex" : "none" },
                    ]}
                  ></View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => milkType("option4")}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: windowHeight * 0.01,
                }}
              >
                <Text
                  style={{
                    color: colors.buttons,
                    fontSize: fontSizeadj(0.028),
                  }}
                >
                  Soya Milk sugar free
                </Text>
                <View style={styles.selectoutside}>
                  <View
                    style={[
                      styles.selectinside,
                      { display: option4 ? "flex" : "none" },
                    ]}
                  ></View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: colors.extra,
          justifyContent: "space-between",
          paddingHorizontal: windowWidth * 0.06,
          gap: windowWidth * 0.04,
          paddingVertical: windowHeight * 0.03,
        }}
      >
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            borderWidth: 0.4,
            borderColor: colors.buttons,
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: windowHeight * 0.015,
            paddingHorizontal: windowWidth * 0.02,
          }}
        >
          <Ionicons
            name="remove"
            size={20}
            color={colors.buttons}
            onPress={() => removeQuantity()}
          />
          <Text style={{ color: colors.buttons }}>{quantity}</Text>
          <Ionicons
            name="add"
            size={20}
            color={colors.buttons}
            onPress={() => addQuantity()}
          />
        </View>
        <TouchableHighlight
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.buttons,
            borderRadius: 10,
          }}
          underlayColor={colors.accent}
          onPress={() => {
            fetchCart(itemData.id, quantity);
            setDrawerValid(false);
            notifyMessage(itemData.name + " added to cart");
          }}
        >
          <View>
            <Text style={{ color: colors.extra }}>Add item $ {qtotal}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: colors.buttons,
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.07,
    alignItems: "center",
  },
  itemText: {
    color: colors.buttons,
    fontSize: fontSizeadj(0.028),
  },
  optionsAvail: {
    backgroundColor: colors.highlight,
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10,
  },
  selectoutside: {
    borderWidth: 0.5,
    borderColor: colors.buttons,
    borderRadius: 50,
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },
  selectinside: {
    borderRadius: 50,
    width: windowWidth * 0.025,
    height: windowWidth * 0.025,
    backgroundColor: colors.buttons,
  },
});

export default Comp_CartExtras;
