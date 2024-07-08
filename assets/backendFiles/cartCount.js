import AsyncStorage from "@react-native-async-storage/async-storage";

async function cartCount() {
  const allKeys = await AsyncStorage.getAllKeys();
  const allData = await AsyncStorage.multiGet(allKeys);
  const numberOfItems = allData.length;
  return numberOfItems;
}

export default cartCount;
