import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../src/styles/LoginScreenStyles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../src/config/config.js'; // ← URL da API
import { salvarToken } from '../../backend/src/services/authService.js'; // ← Funções de token

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const realizarLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                await salvarToken(data.token); // Se ainda quiser salvar o token
                await AsyncStorage.setItem('usuario_id', data.usuario.id.toString()); // ← ESSENCIAL
                navigation.navigate('Dashboard');
            } else {
                Alert.alert('Erro ao logar', data.mensagem || 'Email ou senha inválidos.');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />

            <View style={styles.loginBox}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                <TouchableOpacity>
                    <Text style={styles.forgot}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={realizarLogin}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Ainda não tem conta?{' '}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        Cadastre-se
                    </Text>
                </Text>
            </View>
        </View>
    );
}
