import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import ConsumptionChart from '../assets/components/ConsumptionChart.js'; // Importando o gráfico de consumo
import TopDevicesPieChart from '../assets/components/TopDevicesPieChart.js'; // Importando o gráfico de dispositivos
import applianceIcons from '../utils/applianceIcons.js'; // Importando os ícones dos eletrodomésticos
import styles from '../src/styles/DashboardScreen.styles.js'; // Importando os estilos do DashboardScreen


export default function DashboardScreen() {
  const [appliances, setAppliances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newConsumption, setNewConsumption] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const openModal = () => {
    setModalVisible(true);
    setNewName('');
    setNewConsumption('');
    setSelectedIcon(null);
  };

  const addAppliance = () => {
    if (!newName || !newConsumption || !selectedIcon) return;

    const newAppliance = {
      id: Date.now().toString(),
      name: newName,
      consumption: parseFloat(newConsumption),
      icon: selectedIcon,
    };

    setAppliances([...appliances, newAppliance]);
    setModalVisible(false);
  };

  const deleteAppliance = (id) => {
    setAppliances(appliances.filter(item => item.id !== id));
  };

  const totalConsumption = appliances.reduce((total, item) => total + item.consumption, 0);

  const renderAppliance = ({ item }) => (
    <View style={styles.applianceBox}>
      <Image source={item.icon} style={styles.applianceIcon} />
      <View style={styles.applianceInfo}>
        <Text style={styles.applianceName}>{item.name}</Text>
        <Text style={styles.applianceConsumption}>{item.consumption} kWh</Text>
      </View>
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
        keyExtractor={(item) => item.id}
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
                  onPress={() => setSelectedIcon(iconObj.source)}
                  style={[
                    styles.iconOption,
                    selectedIcon === iconObj.source && styles.selectedIcon,
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

