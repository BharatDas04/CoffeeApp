import * as SecureStore from "expo-secure-store";

export async function getFavData() {
  try {
    const data = await SecureStore.getItemAsync("fav");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(error);
  }
}
