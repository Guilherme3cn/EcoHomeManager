// assets/components/TopDevicesPieChart.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function TopDevicesPieChart({ appliances }) {
  const total = appliances.reduce((sum, item) => sum + item.consumption, 0);

  const tonsDeVerde = [
    '#004d00', // Verde escuro intenso
    '#007f0e', // Verde floresta vibrante
    '#009933', // Verde folha
    '#00b33c', // Verde vivo médio
    '#00cc44', // Verde claro saturado
    '#00e64d', // Verde limão claro
    '#1aff66', // Verde neon
    '#66ff99', // Verde hortelã
    '#b3ffcc', // Verde gelo
    '#e6ffee'  // Verde pálido suave
  ];
  
  const data = appliances
  .map((item, index) => ({
    name: item.name,
    consumption: item.consumption,
    color: tonsDeVerde[index % tonsDeVerde.length],
    legendFontColor: '#333',
    legendFontSize: 13,
  }))
  .sort((a, b) => b.consumption - a.consumption); // Ordena do maior para o menor consumo


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumo por Eletrodoméstico (%)</Text>

      {total > 0 ? (
        <PieChart
          data={data}
          width={screenWidth - 70}
          height={250}
          chartConfig={{
            color: () => '#000',
          }}
          accessor={'consumption'}
          backgroundColor={'transparent'}
          paddingLeft={'70'}
          hasLegend={false} // Remove legenda lateral padrão
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum consumo registrado ainda.</Text>
      )}

      {/* Legenda personalizada abaixo do gráfico */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>
              {item.name} - {((item.consumption / total) * 100).toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 14,
    marginTop: 20,
  },
  legendContainer: {
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingRight: 150,
  },
  legendColor: {
    width: 14,
    height: 14,
    marginRight: 8,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 13,
    color: '#333',
    textAlign: 'left',
  },
});
