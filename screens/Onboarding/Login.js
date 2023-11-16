import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Image, Text } from "react-native";
import LoginInput from "../../components/LoginInput";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const handleSignInPress = () => {
    navigation.goBack();
  }
  async function handleSubmit() {
    const DATA = await AsyncStorage.getItem("login_data");
    const login_data_parsed = JSON.parse(DATA);
    console.log(login_data_parsed)
    console.log(email, password)
    const user = login_data_parsed.find((user) => user.user_email === email && user.user_password === password);
    console.log(user)
    if (!user) {
      alert("Usuario o contraseña incorrectos");
      return;
    }else{
      // Almacena el usuario logeado en AsyncStorage
      await AsyncStorage.setItem("logged_user", JSON.stringify(user));
      navigation.navigate("StackMain");
    }
  };
  return (
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
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
              paddingRight: 24,
              flexDirection: "column",
            }}
          >
            <CustomButton text="Iniciar Sesión" color="#F28B0C" action={handleSubmit}/>
          </View>
          <Text style={{ color: "rgba(166, 166, 166, 1)", fontSize: 14, fontWeight:"300",paddingTop:20 }}>
          ¿No tienes una cuenta?{" "}
            <Text style={{ textDecorationLine: "underline", fontWeight:"600"}} onPress={handleSignInPress}>
            Regístrate
            </Text>
          </Text>
          <StatusBar style="auto" />
        </View>
    </ImageBackground>
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
    fontSize: 24,
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
});
