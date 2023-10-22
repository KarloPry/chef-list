import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
export default function LoginInput({ name, placeholder }) {
  return (
    <>
      <Text style={styles.name_input}>{name}</Text>
      <TextInput
        style={styles.input_login}
        placeholder={placeholder}
      ></TextInput>
    </>
  );
}
const styles = StyleSheet.create({
  input_login: {
    width: "90%",
    height: 55,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 22,
    paddingLeft: 10,
    marginBottom: 20,
  },
  name_input: {
    fontSize: 12,
    fontFamily: "Nunito",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 5,
  }
});