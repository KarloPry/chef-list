import * as React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../MainScreen/Details";
import List from "../MainScreen/List";
import Main from "./Main";
//Context
import MainNavContext from "../../context/MainNavContext";
import SearchResults from "../MainScreen/SearchResults";
export default function StackMain({ navigation }) {
  const Stack = createNativeStackNavigator();
  const contextValue = navigation;
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <MainNavContext.Provider value={contextValue}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="SearchResults" component={SearchResults} options={{title: "Resultados"}}/>
      </Stack.Navigator>
    </MainNavContext.Provider>
  );
}