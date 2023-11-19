import React, {useEffect} from "react";
import { ScrollView, StyleSheet } from "react-native";
import NavBar from "../../components/NavBar";
import FoodSection from "../../components/FoodSection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({navigation}) {
  async function setList(){
    try {
      await AsyncStorage.getItem("Recetas");
    } catch (error) {
      await AsyncStorage.setItem("Recetas", JSON.stringify([]));
    }
  }
  const DATA = require("../../data/comida.json");
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setList();
  }, []);

  return (
    <>
      <NavBar />
      <ScrollView style={styles.mainContainer}>
        <FoodSection title="¡Platillos para tu comida! 👨‍🍳" recipes={DATA} par={true} />
        <FoodSection title="Trending 🔥" recipes={DATA} par={false}/>
      </ScrollView>
      
    </>
  );
}
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop: 20,
      marginBottom: 20,
    },
  });
  