import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import CustomButton from "./CustomButton";
import { FavoriteContext } from "../screens/Routers/Main";
//Context
import MainNavContext from "../context/MainNavContext";
//Icons
import { AntDesign } from "@expo/vector-icons";

export default function FoodCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteValues = useContext(FavoriteContext);
  let favorite = undefined;
  let setFavorite = undefined;
  if (favoriteValues != undefined) {
    favorite = favoriteValues.favorite;
    setFavorite = favoriteValues.setFavorite;
  }
  useEffect(() => {
    try {
      if (favorite == recipe.id) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch {
      setFavorite(0);
    }
  }, [favorite]);
  function checkFavorite() {
    console.log(recipe.id);
    setFavorite(recipe.id);
  }

  const navigation = useContext(MainNavContext);
  function handleViewRecipe() {
    console.log("Ver receta");
    navigation.navigate("Details", {
      recipe,
    });
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: recipe.image,
        }}
        style={styles.imageContainer}
      >
        {favorite && (
          <TouchableOpacity style={styles.favoriteIcon} onPress={checkFavorite}>
            <AntDesign
              name={isFavorite ? "star" : "staro"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.textImage}>{recipe.name}</Text>
        </View>
      </ImageBackground>
      <View style={styles.infoFood}>
        <Text style={{ fontSize: 10 }}>
          ⏲️ {recipe.cookingTime} minutos{" "}
          <Text style={{ color: "gray" }}>
            {" "}
            • {recipe.ingredients.length} ingredientes
          </Text>
        </Text>
        <CustomButton
          text="Detalles 🔎"
          color="#F28B0C"
          action={handleViewRecipe}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 17,
    alignItems: "center",
  },
  imageContainer: {
    width: 250,
    height: 250,
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    color: "white",
    marginBottom: 10,
    position: "relative",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderTopRightRadius: 10,
  },
  textImage: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  infoFood: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
