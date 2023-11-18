import React, {useEffect, useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FoodCard from "../../components/FoodCard";

import NavBar from "../../components/NavBar";

export default function Profile({ navigation }) {
  const [profileImage, setProfileImage] = useState(require("../../assets/images/profile.png"));
  const DATA = require("../../data/comida.json");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const changeProfileImage = async () => {
    try{
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log('Image URI:', result.assets[0].uri);
        setProfileImage({ uri: result.assets[0].uri });
      }

      if (!result.cancelled) {
        setProfileImage({ uri: result.assets[0].uri });
      }
      
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };


  return (
    <>
      <NavBar />
      <ScrollView>
        <TouchableOpacity onPress={changeProfileImage} style={styles.profileImageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.text}>Bienvenido</Text>

        <TextInput 
        style={styles.inputs}
          value={"Aquí se pasa el nombre"}
          editable={false}
        />
        <Text style={styles.text}>Correo</Text>

        <TextInput 
        style={styles.inputs}
          value={"Aquí se pasa el correo"}
          editable={false}
        />

        <Text style={styles.text}>Platillo favorito:</Text>
        
        {/* Muestra de como se vería, se cambiará después para solo mostrar uno */}
        <FoodCard style={styles.platillo} recipe={DATA[1]} /> 

        <Text style={styles.text}>Contraseña:</Text>

        <TextInput 
        style={styles.inputs}
          placeholder="******************"
          editable={false}
        />
        
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    borderWidth: 3,
    borderColor: "#537D3D",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom:10,
    color: "#537D3D",
    textAlign: 'center',
  },
  inputs:{
    height: 40,
    width: 300, 
    marginTop: 5,
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom:5,
  },
});
