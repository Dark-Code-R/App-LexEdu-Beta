import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text, Image, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('https://web-production-c396.up.railway.app/login', { username, password })
      .then(response => {
        if (response.data.message === 'Login successful') {
          navigation.navigate('Introduction', { user: response.data.user });
        } else {
          Alert.alert('Invalid credentials');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error logging in');
      });
  };

  return (
    <LinearGradient
      colors={['#141E30', '#243B55']}
      style={styles.container}
    >
      <StatusBar hidden={Platform.OS === 'android' ? false : true} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <Text style={styles.betaText}>
              ¡Bienvenido a LexEdu!
            </Text>
            <Text style={styles.betaText}>
              Nota: Esta aplicación está en fase beta.
            </Text>
            <Text style={styles.betaText}>
            solo incluye el asistente virtual luego vendran muchas mejoras.
            </Text>
            <Text style={styles.betaText}>
              1. Preguntas detalladas: Formule preguntas completas para obtener respuestas precisas.
            </Text>
            <Text style={styles.betaText}>
              2. Derecho Familiar: Enfocado exclusivamente en derecho familiar.
            </Text>
            <Text style={styles.betaText}>
              3. Comentarios: Agradecemos sus comentarios para mejorar.
            </Text>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/unifranz.png')} style={styles.logo} />
            </View>
            <Animatable.Text animation="fadeIn" duration={2000} style={styles.welcomeText}>
              Bienvenido a LexEdu
            </Animatable.Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  betaText: {
    fontSize: 14,
    color: '#f39c12',
    textAlign: 'center',
    marginBottom: 10, // Espaciado entre párrafos
    paddingHorizontal: 10,
  },
  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    width: '85%',
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    width: '85%',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: '#f39c12',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
