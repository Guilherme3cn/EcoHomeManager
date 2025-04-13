import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../src/styles/RegisterScreenStyles.js'; // Importando os estilos do RegisterScreen

export default function RegisterScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.registerBox}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Cadastre-se para começar a usar o EcoHome Manager</Text>

                <Text style={styles.label}>Nome completo</Text>
                <TextInput style={styles.input} placeholder="Digite seu nome" />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Digite seu email" />

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Crie uma senha" secureTextEntry />

                <Text style={styles.label}>Confirmar senha</Text>
                <TextInput style={styles.input} placeholder="Repita a senha" secureTextEntry />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')} // Navega de volta ao login
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Já tem uma conta?{' '}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Entrar
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}

