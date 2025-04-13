// services/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

export const obterToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return null;
  }
};
