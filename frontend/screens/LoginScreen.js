import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../src/styles/LoginScreenStyles.js'; // Importando os estilos do LoginScreen

export default function LoginScreen() {
    const navigation = useNavigation(); // ← necessário para navegar

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Logo.png')} style={styles.logo} />

            <View style={styles.loginBox}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Digite seu email" />

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

                <TouchableOpacity>
                    <Text style={styles.forgot}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Dashboard')} // ← Aqui navega para Dashboard
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Ainda não tem conta?{' '}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Cadastro')} // ← Aqui navega para Cadastro
                    >
                        Cadastre-se
                    </Text>
                </Text>
            </View>
        </View>
    );
}
