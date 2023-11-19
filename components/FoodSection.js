import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";

//Title es el titulo de la sección general
//Data son los datos recabados de un JSON
const FoodSection = ({ recipes, title, par }) => {
  return (
    <View>
      <Text style={styles.titleSection}>{title}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {recipes.map((recipe) => {
          
          if (recipe.id % 2 == 0 && par == true){
            return (
              <View key={recipe.id} style={styles.itemScroll}>
                <FoodCard
                  recipe={recipe}
                />
              </View>
            );
          }else{
            if (recipe.id % 2 != 0 && par == false){
              return (
                <View key={recipe.id} style={styles.itemScroll}>
                  <FoodCard
                    recipe={recipe}
                  />
                </View>
              );
            }
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    padding: 20,
    marginLeft: 20,
    marginVertical: 10,
  },
  itemScroll: {
    marginRight: 20,
  },
  titleSection: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default FoodSection;
