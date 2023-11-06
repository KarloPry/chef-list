import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FoodCard from "../../components/FoodCard";

export default function SearchResults({ route }) {
  let { name } = route.params;
  name == "Botanas" ? name = "Botana" : {}
  name == "Bebidas" ? name = "Bebida" : {}
  name == "Entradas" ? name = "Entrada" : {}
  let recipes = require("../../data/comida.json");
  //Filter data based on type of food
  recipes = recipes.filter((recipe) => recipe.category === name);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {recipes.map((recipe) => {
        return (
          <View key={recipe.id} style={styles.itemScroll}>
            <FoodCard recipe={recipe}/>
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
        gap: 20,
      },
      itemScroll: {
        marginRight: 20,
      },
});