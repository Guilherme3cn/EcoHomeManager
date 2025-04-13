// src/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salva o token JWT no armazenamento local
export const salvarToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.error('Erro ao salvar o token:', e);
  }
};

// Recupera o token JWT do armazenamento local
export const obterToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    console.error('Erro ao obter o token:', e);
    return null;
  }
};

// Remove o token JWT (ex: ao fazer logout)
export const removerToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.error('Erro ao remover o token:', e);
  }
};
