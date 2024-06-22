import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Importar TouchableOpacity
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import * as Animatable from 'react-native-animatable';

type IntroductionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Introduction'>;
type IntroductionScreenRouteProp = RouteProp<RootStackParamList, 'Introduction'>;

type Props = {
  navigation: IntroductionScreenNavigationProp;
  route: IntroductionScreenRouteProp;
};

const IntroductionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = route.params;
  const [displayText, setDisplayText] = useState('');

  const fullText = `Hola, soy Nova, tu asistente virtual legal. Estoy aquí para ofrecerte apoyo y orientación en temas de derecho. Puedes consultarme sobre cualquier duda o pregunta legal que tengas, y te proporcionaré información precisa y recursos útiles. Juntos exploraremos tus inquietudes legales y te brindaré el acompañamiento necesario.`;

  useEffect(() => {
    let currentText = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setDisplayText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Ajusta el tiempo para cambiar la velocidad de la animación

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    navigation.navigate('Chat', {
      user,
      conversationName: 'Chat inicial',
      emotion: 'neutral', // Valor predeterminado
      initialMessage: 'Hola soy Nova, espero serte de mucha ayuda', // Valor predeterminado
      conversationId: '12345', // Valor predeterminado
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hola.gif')} style={styles.gif} />
      <Text style={styles.title}>¡Hola, {user}!</Text>
      <Animatable.Text animation="fadeIn" style={styles.text}>
        {displayText}
      </Animatable.Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Cambiar el fondo a negro
  },
  gif: {
    width: '80%',  // Ajusta el ancho del GIF al 80% del contenedor
    height: 200,    // Ajusta la altura del GIF a 200px (puedes cambiarlo según sea necesario)
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Cambiar el color del texto a blanco
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ddd', // Cambiar el color del texto a un gris claro
  },
  button: {
    backgroundColor: '#3498db', // Color del botón
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IntroductionScreen;
