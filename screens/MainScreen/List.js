import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RecipeList from "../../components/RecipeList";

export default function List() {
  const [recipes, setRecipes] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  // Function to check if all ingredients are checked
  function checkAllIngredientsChecked() {
    const areAllIngredientsChecked = recipes.every((recipe) =>
      recipe.ingredients.every((ingredient) => ingredient.checked)
    );
    setAllIngredientsChecked(areAllIngredientsChecked);
  }

  // Function to handle ingredient checkbox check/uncheck
  function handleCheckIngredient(ingredient, recipeIndex) {
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].ingredients = updatedRecipes[
      recipeIndex
    ].ingredients.map((i) =>
      i.id === ingredient.id ? { ...i, checked: !i.checked } : i
    );
    setRecipes(updatedRecipes);
  }

  // UseEffect to load saved recipes
  async function getSavedRecipes() {
    const recipes = await AsyncStorage.getItem("Recetas");
    return recipes;
  }

  useEffect(() => {
    const loadRecipes = async () => {
      const recipes = await getSavedRecipes();
      if (recipes) {
        const recipesArray = JSON.parse(recipes);
        setRecipes(recipesArray);
      }
    };
    loadRecipes();
  }, []);

  let colorType = -1;

  useEffect(() => {
    checkAllIngredientsChecked();
  }, [recipes]);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Text style={styles.mainText}>Lista de Recetas</Text>
      {recipes.map((recipe) => {
        colorType = colorType * -1;
        let colorBg = colorType === -1 ? "#FFFAF0" : "#FBFFF2";
        let colorIs = colorType === -1 ? "#FFB000" : "#9FD225";

        let containerStyleSheet = StyleSheet.create({
          container: {
            backgroundColor: colorBg,
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 2,
          },
        });

        return (
          <View style={containerStyleSheet.container} key={recipe.id}>
            <RecipeList
              recipe={recipe}
              mainColor={colorIs}
              softColor={colorBg}
              key={recipe.id}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "white",
    display: "flex",
  },
  mainText: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
  },
  recipeText: {
    fontSize: 22,
    marginBottom: 10,
  },
});
