import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../backendFiles/colors";
import fontSizeadj from "../backendFiles/fontSizeadj";
import { useNavigation } from "@react-navigation/native";
import coffee from "../backendFiles/coffee.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Comp_Special() {
  const navigation = useNavigation();
  const currData = coffee.find((item) => item.id === 18498);
  return (
    <View>
      <View style={styles.headingSpecial}>
        <Text style={styles.headingSpecialText}>Special for you</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          const idItem = 18498;
          navigation.push("detailPage", { idItem: idItem });
        }}
        underlayColor={colors.accent}
        style={{ borderRadius: 40 }}
      >
        <View style={styles.CompTwo_Container}>
          <View style={styles.offerSpecialTextContainer}>
            <View style={styles.offerSpecialTextContainerInsideTop}>
              <Text style={styles.offerSpecialTextHeading}>Affogat</Text>
              <Text style={styles.offerSpecialTextSubHeading}>
                Espresso-based
              </Text>
            </View>
            <View style={styles.offerSpecialTextContainerInsideBottom}>
              <Text style={styles.offerSpecialTextSale}>#SAVE50</Text>
              <Text style={styles.offerSpecialLowerTextSale}>
                Use code to save 50%
              </Text>
            </View>
          </View>
          <View style={styles.offerSpecialImgContainer}>
            <Image
              style={styles.offerSpecialImage}
              source={{ uri: currData.image_link }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  CompTwo_Container: {
    flexDirection: "row",
    flex: 0.8,
    paddingVertical: windowHeight * 0.03,
    backgroundColor: colors.extra,
    borderRadius: 30,
    marginTop: windowHeight * 0.02,
    justifyContent: "center",
    gap: windowWidth * 0.05,
    marginBottom: 20,
  },
  headingSpecial: {
    flex: 0.2,
    color: "white",
  },
  headingSpecialText: {
    fontSize: fontSizeadj(0.05),
    fontWeight: "bold",
  },
  offerSpecialTextContainer: {
    width: windowWidth * 0.3,
    color: "white",
    justifyContent: "space-between",
    paddingVertical: windowHeight * 0.02,
    flexWrap: "wrap",
  },
  offerSpecialImgContainer: {
    flex: 0.7,
    height: windowHeight * 0.2,
  },
  offerSpecialImage: {
    flex: 1,
    resizeMode: "center",
    aspectRatio: 1,
    marginLeft: "auto",
    borderRadius: 100,
  },
  offerSpecialTextHeading: {
    fontSize: fontSizeadj(0.08),
    color: "white",
  },
  offerSpecialTextSubHeading: {
    color: colors.accent,
    fontSize: fontSizeadj(0.03),
  },
  offerSpecialTextSale: {
    color: colors.buttons,
    fontWeight: "bold",
    fontSize: fontSizeadj(0.06),
  },
  offerSpecialLowerTextSale: {
    color: colors.accent,
    fontSize: fontSizeadj(0.024),
  },
});

export default Comp_Special;
