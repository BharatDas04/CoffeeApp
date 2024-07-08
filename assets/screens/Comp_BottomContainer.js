import React, { useEffect, useState, useRef } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from "react-native";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { colors } from "../backendFiles/colors";
import coffee from "../backendFiles/coffee.json";
import { AntDesign } from "@expo/vector-icons";
import Comp_Special from "../screens/Comp_Special";
import coffeeData from "../backendFiles/coffee.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Comp_BottomContainer({ route }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const isFocus = useIsFocused();

  const handleSearchQueries = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = coffeeData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  useEffect(() => {
    if (isFocus === true) {
      setModalOpen(false);
    }
  }, [isFocus]);

  const navigation = useNavigation();
  const fetchCart = route.params.fetchCart;

  const [currSelect, setCurrSelect] = useState("all");
  const filtersView = StyleSheet.create({
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.01,
    backgroundColor: colors.accent,
    borderRadius: 50,
  });
  const uniqueTypesSet = new Set(coffee.map((item) => item.name));
  const uniqueTypes = Array.from(uniqueTypesSet);
  uniqueTypes.unshift("All");

  const [coffeeMap, setCoffeeMap] = useState(coffee);

  const filterUpdate = (name) => {
    setCurrSelect(name.toLocaleLowerCase());
    const filteredData = [];
    coffee.forEach((item) => {
      for (const tag of item.tags) {
        if (name.toLowerCase().includes(tag)) {
          filteredData.push(item);
          break;
        }
      }
    });
    setCoffeeMap(filteredData);
  };
  const scrollViewRef = useRef(null);
  useEffect(() => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }, [coffeeMap]);

  const navigateToDetailPage = (idItem) => {
    navigation.navigate("Home", {
      screen: "detailPage",
      params: {
        idItem: idItem,
      },
    });
  };

  return (
    <View style={styles.outsideContainer}>
      <Modal
        visible={modalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalOpen(false)}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            width: "100%",
            height: "100%",
            paddingHorizontal: windowWidth * 0.05,
          }}
        >
          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TextInput
              style={[
                styles.Comp_search,
                {
                  fontSize: fontSizeadj(0.04),
                  width: "100%",
                  borderRadius: 10,
                },
              ]}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearchQueries}
              onPressIn={() => setModalOpen(true)}
              autoFocus
            />
          </View>
          <View style={{ flex: 0.8 }}>
            {suggestions.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => navigateToDetailPage(item.id)}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: windowWidth * 0.06,
                    alignItems: "center",
                    paddingHorizontal: windowWidth * 0.04,
                    backgroundColor: colors.top,
                    paddingVertical: windowHeight * 0.02,
                    borderRadius: 10,
                    marginTop: windowHeight * 0.02,
                  }}
                >
                  <Text style={{ fontSize: fontSizeadj(0.04) }}>
                    {index + 1}
                  </Text>
                  <Text
                    style={{ marginRight: "auto", fontSize: fontSizeadj(0.04) }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: fontSizeadj(0.04) }}>
                    $ {item.cost}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </Modal>
      <View style={styles.Comp_containerTwo}>
        <TextInput
          style={[styles.Comp_search, { fontSize: fontSizeadj(0.04) }]}
          placeholder="Search..."
          onPressIn={() => setModalOpen(true)}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.CompOne_Container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.filters}>
              {uniqueTypes.map((name, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => filterUpdate(name)}
                  underlayColor={"rgba(255, 255, 255, 0.2)"}
                >
                  <View
                    style={filtersView}
                    backgroundColor={
                      currSelect === name.toLocaleLowerCase()
                        ? colors.buttons
                        : colors.accent
                    }
                  >
                    <Text style={styles.filtersViewText}>{name}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </ScrollView>
          <ScrollView
            style={styles.menu}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {coffeeMap.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  const idItem = item.id;
                  navigation.navigate("detailPage", { idItem: idItem });
                }}
                key={index}
              >
                <View style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image_link }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.heading}>{item.name}</Text>
                    <Text style={styles.smallHeading}>{item.type}</Text>
                    <View style={styles.buyM}>
                      <Text style={styles.price}>${item.cost}</Text>
                      <TouchableHighlight
                        style={styles.button}
                        underlayColor="#DDDDDD"
                        onPress={() => {
                          fetchCart(item.id);
                        }}
                      >
                        <View style={styles.buttonContent}>
                          <AntDesign name="plus" size={14} color="black" />
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
        <View style={styles.offerContainer}>
          <Comp_Special />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  smallHeading: {
    marginBottom: windowHeight * 0.02,
    color: colors.accent,
    opacity: 0.6,
    fontSize: fontSizeadj(0.025),
  },
  headingType: {
    fontSize: fontSizeadj(0.05),
  },
  button: {
    backgroundColor: colors.buttons,
    borderRadius: 50,
    padding: windowWidth * 0.01,
  },
  buyM: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: fontSizeadj(0.04),
    fontWeight: "bold",
    color: colors.buttons,
  },
  card: {
    backgroundColor: "#222325",
    borderRadius: 30,
    marginRight: 10,
    paddingHorizontal: windowWidth * 0.06,
    paddingVertical: windowHeight * 0.03,
    width: windowWidth * 0.4,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: windowHeight * 0.01,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  textContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "left",
  },
  heading: {
    fontSize: fontSizeadj(0.04),
    color: "white",
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.01,
  },
  menu: {
    marginTop: "10%",
    flex: 1,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filtersViewText: {
    fontSize: fontSizeadj(0.035),
    color: "black",
  },
  outsideContainer: {
    alignItems: "center",
    paddingTop: windowHeight * 0.01,
    backgroundColor: colors.primary,
  },
  CompOne_Container: {
    flex: 1,
    width: "100%",
    marginTop: windowHeight * 0.01,
  },
  offerContainer: {
    marginTop: windowHeight * 0.04,
  },
  Comp_containerTwo: {
    justifyContent: "center",
    width: "100%",
    marginBottom: windowHeight * 0.02,
  },
  Comp_search: {
    backgroundColor: colors.accent,
    color: colors.extra,
    borderRadius: 50,
    paddingHorizontal: "10%",
    paddingVertical: "4%",
    fontSize: fontSizeadj(5),
  },
});

export default Comp_BottomContainer;
