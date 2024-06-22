import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { RootStackParamList, Message } from '../types';
import 'react-native-get-random-values'; // Import this to support crypto.getRandomValues on mobile
import { v4 as uuidv4 } from 'uuid';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type Props = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen: React.FC<Props> = ({ route }) => {
  const { emotion, user, initialMessage, conversationId, conversationName } = route.params;
  const [messages, setMessages] = useState<Message[]>([{ text: initialMessage, sender: 'assistant' }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = { text: inputText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setIsTyping(true);

    axios.post('https://web-production-c396.up.railway.app/chat', { user_input: inputText, user, conversationId })
      .then(response => {
        const assistantMessage: Message = { text: response.data.response, sender: 'assistant' };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
        setIsTyping(false);
      })
      .catch(error => {
        console.error(error);
        setIsTyping(false);
      });
  };

  const renderItem = ({ item }: { item: Message }) => (
    <Animatable.View
      animation={item.sender === 'assistant' ? 'fadeIn' : 'fadeInUp'}
      duration={1000}
      style={item.sender === 'user' ? styles.userMessage : styles.assistantMessage}
    >
      <Text style={item.sender === 'user' ? styles.userText : styles.assistantText}>{item.text}</Text>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={['#121212', '#1E1E1E']}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.typingText}>Nova está escribiendo...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Animatable.View animation="bounceIn" duration={1500} style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#888"
            onFocus={() => flatListRef.current?.scrollToEnd({ animated: true })}
            multiline
          />
        </Animatable.View>
        <Animatable.View animation="bounceIn" duration={800}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 20, // Adjusted padding to move the first message away from the top
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E2E2E', // Azul claro para los mensajes del usuario
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2E2E2E', // Gris oscuro para los mensajes del asistente
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  userText: {
    color: '#fff', // Texto blanco
  },
  assistantText: {
    color: '#fff', // Texto blanco
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  sendButton: {
    backgroundColor: '#F0A500', // Naranja suave para el botón de enviar
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  typingText: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default ChatScreen;
