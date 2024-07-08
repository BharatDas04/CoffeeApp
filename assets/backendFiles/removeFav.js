import * as SecureStore from "expo-secure-store";

export async function removeFav(itemid) {
  try {
    const exisitingFavs = await SecureStore.getItemAsync("fav");
    const updatedFavs = JSON.parse(exisitingFavs).filter(
      (fav) => fav !== itemid
    );

    await SecureStore.setItemAsync("fav", JSON.stringify(updatedFavs));
    console.log("item removed from favourites : ", itemid);
  } catch (error) {
    console.error(error);
  }
}
