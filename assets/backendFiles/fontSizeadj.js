import { PixelRatio, Dimensions } from "react-native";

function fontSizeadj(size) {
  const screenWidth = Dimensions.get("window").width;
  const fontSize = Math.round(screenWidth * size);
  const adjustedFontSize = fontSize / PixelRatio.getFontScale();
  return adjustedFontSize;
}

export default fontSizeadj;
