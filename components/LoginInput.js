import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
export default function LoginInput({ name, placeholder, type, onChangeText }) {
  return (
    <>
      <Text style={styles.name_input}>{name}</Text>
      <TextInput
        style={styles.input_login}
        placeholder={placeholder}
        secureTextEntry = {type === "password" ? true : false}
        onChangeText={onChangeText}
      ></TextInput>
    </>
  );
}
const styles = StyleSheet.create({
  input_login: {
    width: "90%",
    height: 55,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  name_input: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    alignSelf: "flex-start",
    marginLeft: "5.5%",
    marginBottom: 5,
  }
});
