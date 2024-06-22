export type RootStackParamList = {
  Home: { user: string; conversationName: string };
  Chat: { emotion: string; user: string; initialMessage: string; conversationId: string; conversationName: string; initialChatHistory?: Message[] };
  Login: undefined;
  Register: undefined;
  ChatList: { user: string };
  Introduction: { user: string };
  GeneradorCasos: undefined;
  SimuladorJuicios: undefined;
  Foro: undefined;
  Notificaciones: undefined;
  AjustesPerfil: undefined;
  Welcome: undefined; // Añade esta línea
};

export type Message = {
  text: string;
  sender: 'user' | 'assistant';
};

export type Conversation = {
  id: string;
  name: string;
};
