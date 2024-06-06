import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/Onboarding/SignIn';
import Login from './screens/Onboarding/Login';
import StackMain from './screens/Routers/StackMain';

// This is a comment
// This is another comment
export default function App({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StackMain" component={StackMain} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}
