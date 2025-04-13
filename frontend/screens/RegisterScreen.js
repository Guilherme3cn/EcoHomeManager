import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../src/styles/RegisterScreenStyles.js';


import { API_URL } from '../src/styles/config/config.js'; // URL da API

export default function RegisterScreen() {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const registrarUsuario = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            return Alert.alert('Erro', 'Preencha todos os campos.');
        }

        if (senha !== confirmarSenha) {
            return Alert.alert('Erro', 'As senhas não coincidem.');
        }

        try {
            const response = await fetch(`${API_URL}/usuarios/registrar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro ao cadastrar', data.mensagem || 'Tente novamente.');
            }
        } catch (error) {
            console.error('Erro no registro:', error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.registerBox}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Cadastre-se para começar a usar o EcoHome Manager</Text>

                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />

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
                    placeholder="Crie uma senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                <Text style={styles.label}>Confirmar senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Repita a senha"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
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
