import AsyncStorage from "@react-native-async-storage/async-storage";

async function deleteCart(itemid) {
  try {
    // STORE ON ASYNC STORAGE
    let currCount = await AsyncStorage.getItem(itemid.toString());
    if (currCount == 1) {
      await AsyncStorage.removeItem(itemid.toString());
    } else {
      currCount = parseInt(currCount) - 1;
      await AsyncStorage.setItem(itemid.toString(), currCount.toString());
    }

    // await AsyncStorage.clear();
  } catch (error) {
    console.error("Error getting number of items stored:", error);
  }
}

export default deleteCart;
