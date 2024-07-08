import * as SecureStore from "expo-secure-store";

export async function addFav(itemid) {
  try {
    const exisitingData = await SecureStore.getItemAsync("fav");
    let favourites = exisitingData ? JSON.parse(exisitingData) : [];

    favourites.push(itemid);

    await SecureStore.setItemAsync("fav", JSON.stringify(favourites));
  } catch (error) {
    console.error(error);
  }
}
