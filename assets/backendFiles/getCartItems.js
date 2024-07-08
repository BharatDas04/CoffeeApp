import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCartItems() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const data = {};
    items.forEach(([key, value]) => {
      data[key] = value;
    });

    return { data, keys };
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
    return null;
  }
}
