import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { RootStackParamList } from '../types';
import IntroductionScreen from '../screens/IntroductionScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  useEffect(() => {
    // Aquí puedes agregar cualquier lógica que necesites ejecutar al montar el componente
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Ocultar los encabezados de todas las pantallas
        cardStyle: { backgroundColor: 'transparent' }, // Asegurar que el fondo sea transparente
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Introduction" component={IntroductionScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
