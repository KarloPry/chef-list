import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Image, Text } from "react-native";
import LoginInput from "../../components/LoginInput";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignIn({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    createLoginData();
  }, []);
  async function createLoginData() {
    if (await AsyncStorage.getItem("login_data")) {
      return;
    }
    const login_data = [
      {
        user_id: 1,
        user_password: "admin",
        user_email: "admin@google.com",
        user_name: "admin",
      },
      {
        user_id: 2,
        user_password: "kang123",
        user_email: "karlopaz@gmail.com",
        user_name: "Karlo Paz",
      },
      {
        user_id: 3,
        user_password: "estrella222",
        user_email: "frida@gmail.com",
        user_name: "Frida Olivera",
      },
      {
        user_id: 4,
        user_password: "kang123",
        user_email: "andrestorres@hotmail.com",
        user_name: "Andres Torres",
      },
      {
        user_id: 5,
        user_password: "contrasena",
        user_email: "jesusalberto@gmail.com",
        user_name: "Jesus Alberto",
      },
    ];
    await AsyncStorage.setItem("login_data", JSON.stringify(login_data));
  }
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  async function handleSubmit() {
    const DATA = await AsyncStorage.getItem("login_data");
    const login_data_parsed = JSON.parse(DATA);
    //save data in async storage
    const user = login_data_parsed.find((user) => user.user_email === email);
    if (user) {
      alert("El correo ya está registrado");
      return;
    } else {
      if (password !== confirm_password) {
        alert("Las contraseñas no coinciden");
        return;
      }
      const new_user = {
        user_id: login_data_parsed.length + 1,
        user_password: password,
        user_email: email,
        user_name: name,
      };
      login_data_parsed.push(new_user);
      await AsyncStorage.setItem(
        "login_data",
        JSON.stringify(login_data_parsed)
      );
      navigation.navigate("StackMain");
    }
  }
  return (
    <>
      <StatusBar style="light" />

      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.welcome_image}
            />
            <Text style={styles.welcome_text}>¡Bienvenido a ChefList!</Text>
          </View>
          <LoginInput
            name="Nombre"
            placeholder="Nombre"
            type="text"
            onChangeText={(text) => setName(text)}
          />
          <LoginInput
            name="Correo Electrónico"
            placeholder="ejemplo@email.com"
            type="text"
            onChangeText={(text) => setEmail(text)}
          />
          <LoginInput
            name="Contraseña"
            placeholder="*********"
            type="password"
            onChangeText={(text) => setPassword(text)}
          />
          <LoginInput
            name="Confirmar Contraseña"
            placeholder="*********"
            type="password"
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
              paddingRight: 24,
              flexDirection: "column",
            }}
          >
            <CustomButton
              text="Registrarse"
              color="#F28B0C"
              action={handleSubmit}
            />
          </View>
          <Text
            style={{
              color: "rgba(166, 166, 166, 1)",
              fontSize: 14,
              fontWeight: "300",
              paddingTop: 20,
            }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Text
              style={{ textDecorationLine: "underline", fontWeight: "600" }}
              onPress={handleLoginPress}
            >
              Inicia sesión
            </Text>
          </Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "rgba(110, 168, 80, 0.05)",
    justifyContent: "center",
    backgroundSize: "cover",
  },
  welcome: {
    alignItems: "center",
    color: "#FFF",
    flexDirection: "column",
  },
  welcome_text: {
    fontSize: 26,
    color: "#FFF",
    fontWeight: "600",
    marginBottom: 20,
    paddingTop: 30,
  },
  welcome_image: {
    width: 140,
    height: 135,
    paddingBottom: 20,
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
