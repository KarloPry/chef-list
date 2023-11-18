import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Context
import MainNavContext from "../context/MainNavContext";
//Icons
import { AntDesign } from "@expo/vector-icons";

export default function FoodCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  async function checkFavorite () {
    try{
      const favorite = await AsyncStorage.getItem('favorite');
      console.log('Favorito: ', favorite);
      if(favorite) {
        const favoriteParsed = JSON.parse(favorite);
        if(favoriteParsed.favoriteId != recipe.id) {
          setIsFavorite(false);
        }
      }
    } catch(error) {
      console.log('Error en obtener favorito');
    }
  }

  async function storeFavorite () {
    try{
      const favorite = {
        favoriteId: recipe.id 
      }
      await AsyncStorage.setItem('favorite', JSON.stringify(favorite));
      console.log('Favorito: ', favorite);
      setIsFavorite(true);
      } catch(error) {
      console.log('Error en guardar favorito');
    }
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
        <TouchableOpacity style={styles.favoriteIcon} onPress={isFavorite ? checkFavorite : storeFavorite}>
          <AntDesign name={isFavorite?'star':'staro'} size={24} color="white" />
        </TouchableOpacity>
       

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
