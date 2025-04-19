import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import ConsumptionChart from '../assets/components/ConsumptionChart.js';
import TopDevicesPieChart from '../assets/components/TopDevicesPieChart.js';
import applianceIcons from '../utils/applianceIcons.js';
import styles from '../src/styles/DashboardScreen.styles.js';
import { API_URL } from '../src/config/config.js';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicionei o import que estava faltando

export default function DashboardScreen() {
  const [appliances, setAppliances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newConsumption, setNewConsumption] = useState('');
  const [selectedIconName, setSelectedIconName] = useState(null);

  useEffect(() => {
    buscarDispositivosDoUsuario();
  }, []);

  // Função para abrir o modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Função para buscar dispositivos do usuário
  const buscarDispositivosDoUsuario = async () => {
    try {
      const usuario_id = await AsyncStorage.getItem('usuario_id');

      const response = await fetch(`${API_URL}/dispositivos/usuario/${usuario_id}`);
      const data = await response.json();

      if (response.ok) {
        const formatted = data.map(item => {
          const iconObj = applianceIcons.find(icon => icon.name === item.icone);
          return {
            id: item.id,
            name: item.nome,
            consumption: parseFloat(item.consumo),
            icon: iconObj?.source || null,
          };
        });

        setAppliances(formatted);
      } else {
        console.error('Erro ao buscar dispositivos:', data);
      }
    } catch (error) {
      console.error('Erro de rede ao buscar dispositivos:', error);
    }
  };

  // Função para adicionar novo dispositivo
  const addAppliance = async () => {
    if (!newName || !newConsumption || !selectedIconName) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      const usuario_id = await AsyncStorage.getItem('usuario_id');

      if (!usuario_id) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }

      console.log('Enviando dispositivo:', {
        nome: newName,
        consumo: newConsumption,
        icone: selectedIconName,
        usuario_id: usuario_id,
      });

      const response = await fetch(`${API_URL}/dispositivos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: newName,
          consumo: newConsumption,
          icone: selectedIconName,
          usuario_id: usuario_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        buscarDispositivosDoUsuario();
        setModalVisible(false);
      } else {
        Alert.alert('Erro', data.mensagem || 'Erro ao adicionar dispositivo.');
      }
    } catch (error) {
      console.error('Erro ao adicionar dispositivo:', error);
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    }
  };

  // Função para deletar dispositivo
  const deleteAppliance = async (id) => {
    try {
      const response = await fetch(`${API_URL}/dispositivos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Remove o dispositivo da lista localmente também
        setAppliances(prevAppliances => prevAppliances.filter(item => item.id !== id));
        Alert.alert('Sucesso', 'Dispositivo deletado com sucesso!');
      } else {
        Alert.alert('Erro', data.mensagem || 'Erro ao deletar dispositivo.');
      }
    } catch (error) {
      console.error('Erro ao deletar dispositivo:', error);
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    }
  };



  const totalConsumption = appliances.reduce((total, item) => total + item.consumption, 0);

  const renderAppliance = ({ item }) => (
    <View style={styles.applianceBox}>
      <Image source={item.icon} style={styles.applianceIcon} />
      <View style={styles.applianceInfo}>
        <Text style={styles.applianceName}>{item.name}</Text>
        <Text style={styles.applianceConsumption}>{item.consumption} kWh</Text>
      </View>
      {/* Aqui você ainda tem que fazer a função deleteAppliance, ok? */}
      <TouchableOpacity onPress={() => deleteAppliance(item.id)}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>EcoHome Manager</Text>

      <View style={styles.consumptionBox}>
        <Text style={styles.consumptionLabel}>Consumo Atual</Text>
        <Text style={styles.consumptionValue}>{totalConsumption.toFixed(2)} kWh</Text>
      </View>

      <Text style={styles.sectionTitle}>Eletrodomésticos Conectados</Text>

      <FlatList
        data={appliances}
        renderItem={renderAppliance}
        keyExtractor={(item) => item.id.toString()}
        style={styles.applianceList}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+ Adicionar Dispositivo</Text>
      </TouchableOpacity>

      <View style={styles.graphPlaceholder}>
        <TopDevicesPieChart appliances={appliances} />
      </View>

      <Text style={styles.graphText}>Gráficos de Consumo</Text>
      <ConsumptionChart tipo="diario" />
      <ConsumptionChart tipo="semanal" />
      <ConsumptionChart tipo="mensal" />

      {/* Modal para adicionar novo eletrodoméstico */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Dispositivo</Text>
            <TextInput
              placeholder="Nome do dispositivo"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Consumo (kWh)"
              style={styles.input}
              keyboardType="numeric"
              value={newConsumption}
              onChangeText={setNewConsumption}
            />

            <Text style={styles.iconLabel}>Escolha um ícone:</Text>
            <ScrollView horizontal style={styles.iconScroll}>
              {applianceIcons.map((iconObj, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIconName(iconObj.name)}
                  style={[
                    styles.iconOption,
                    selectedIconName === iconObj.name && styles.selectedIcon,
                  ]}
                >
                  <Image source={iconObj.source} style={styles.iconImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addAppliance} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
