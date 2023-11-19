import React, { useEffect } from "react";
import { ScrollView, Text, StyleSheet, View} from "react-native";
import NavBar from "../../components/NavBar";
import SearchSection from "../../components/SearchSection";

export default function Search({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  function handleSectionPress(name){
    console.log(`Press! ${name}`)
    navigation.navigate("SearchResults", {
      name
    })
  }
  return (
    <>
      <NavBar />
      <ScrollView style={styles.mainContainer}>
        <Text
          style={styles.searchMainText}
        >
          Categorías 🔍
        </Text>
        <SearchSection name="Desayuno" action={handleSectionPress}/>
        <SearchSection name="Lunch" action={handleSectionPress}/>
        <SearchSection name="Bebidas" action={handleSectionPress}/>
        <SearchSection name="Entradas" action={handleSectionPress}/>
        <SearchSection name="Botanas" action={handleSectionPress}/>
        <SearchSection name="Plato Fuerte" action={handleSectionPress}/>
        <SearchSection name="Postres" action={handleSectionPress}/>
        <View style={{height: 40}}></View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  searchMainText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  }
});