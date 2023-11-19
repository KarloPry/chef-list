import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FoodCard from "../../components/FoodCard";
import { useNavigation } from "@react-navigation/native";

export default function SearchResults({ route }) {
 const navigation = useNavigation();
 let name = route.params.name;
  name == "Botanas" ? (name = "Botana") : {};
  name == "Bebidas" ? (name = "Bebida") : {};
  name == "Entradas" ? (name = "Entrada") : {};
  name == "Plato Fuerte" ? (name = "Plato fuerte") : {};
  let recipes = require("../../data/comida.json");
  useEffect(() => {
    navigation.setOptions({
      title: name
    });
  }, []);
  
  //Filter data based on type of food
  console.log(name);
  recipes = recipes.filter((recipe) => recipe.category == name);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {recipes.map((recipe) => {
        return (
          <View key={recipe.id} style={styles.itemScroll}>
            <FoodCard recipe={recipe} />
          </View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    borderWidth: 0,
    padding: 20,
    marginLeft: 20,
    marginVertical: 10,
    paddingBottom: 40,
    gap: 20,
  },
  itemScroll: {
    marginRight: 20,
  },
});
