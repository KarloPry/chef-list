import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomButton from "./CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeList({ recipe, mainColor, softColor }) {
  const [allChecked, setAllChecked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: softColor,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    recipeText: {
      fontSize: 22,
      marginBottom: 10,
      color: mainColor,
    },
  });
  function handleCheckIngredient(ingredient) {
    if (ingredient.checked === false || ingredient.checked == undefined) {
      ingredient.checked = true;
    } else {
      ingredient.checked = false;
    }
    checkAllIngredientsChecked();
  }
  function checkAllIngredientsChecked() {
    let allChecked = true;
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.checked === false || ingredient.checked == undefined) {
        allChecked = false;
      }
    });
    setAllChecked(allChecked);
  }
  async function handleDeleteButton(recipe) {
    const recipes = await AsyncStorage.getItem("Recetas");
    const recipesArray = JSON.parse(recipes);
    const updatedRecipes = recipesArray.filter((r) => r.id !== recipe.id);
    await AsyncStorage.setItem("Recetas", JSON.stringify(updatedRecipes));
    setIsDeleted(true);
  }

  return isDeleted == false ? (
    <View style={styles.mainContainer}>
      <Text style={styles.recipeText}>{recipe.name}</Text>
      {recipe.ingredients.map((ingredient) => {
        return (
          <View key={ingredient.id}>
            <BouncyCheckbox
              text={ingredient.name}
              fillColor={mainColor}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: mainColor }}
              textStyle={{ fontSize: 14 }}
              onPress={() => handleCheckIngredient(ingredient)}
              isChecked={ingredient.checked}
              style={{ marginBottom: 10 }}
            />
          </View>
        );
      })}
      {allChecked == true && (
        <View style={{marginLeft: 160}}>
          <CustomButton
            color={"#FF3C00"}
            text="Borrar"
            action={() => handleDeleteButton(recipe)}
          />
        </View>
      )}
    </View>
  ) : (
    <View>
      <Text>Receta borrada</Text>
    </View>
  );
}
