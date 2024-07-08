import AsyncStorage from "@react-native-async-storage/async-storage";

async function addToCart(itemid, quan) {
  try {
    // STORE ON ASYNC STORAGE
    const addition = quan ? quan : 1;
    let currCount = await AsyncStorage.getItem(itemid.toString());
    const isZero = currCount === null;
    if (isZero) currCount = addition;
    else currCount = parseInt(currCount) + addition;
    await AsyncStorage.setItem(itemid.toString(), currCount.toString());
    // await AsyncStorage.clear();
  } catch (error) {
    console.error("Error getting number of items stored:", error);
  }
}

export default addToCart;
