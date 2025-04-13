
// Grafico de pizza com os eletrodomésticos que mais consomem energia em tempo real
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const greenShades = [
    '#00C853', // Verde vibrante
    '#2E7D32', // Verde escuro
    '#A5D6A7', // Verde claro
    '#66BB6A', // Verde médio
    '#1B5E20', // Verde bem escuro
    '#81C784', // Verde suave
    '#388E3C', // Verde profundo
    '#4CAF50', // Verde folha
    '#69F0AE', // Verde menta
    '#43A047', // Verde grama
];

export default function TopDevicesPieChart({ appliances }) {
    const totalConsumption = appliances.reduce(
        (total, appliance) => total + parseFloat(appliance.consumption),
        0
    );

    const chartData = appliances.map((appliance, index) => ({
        population: parseFloat(appliance.consumption), // remove name
        color: greenShades[index % greenShades.length],
    }));

    return (
        <View style={styles.chartWrapper}>
            {appliances.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum dispositivo conectado ainda.</Text>
            ) : (
                <>
                    <PieChart
                        data={chartData}
                        width={screenWidth - 80}
                        height={250}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 2,
                            color: () => '#00C853',
                            labelColor: () => '#333',
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="80"
                        absolute
                        hasLegend={false} // ESSENCIAL para ocultar bolinha de legenda
                    />

                    <View style={styles.legendContainer}>
                        {appliances.map((item, index) => {
                            const percent = ((parseFloat(item.consumption) / totalConsumption) * 100).toFixed(1);
                            return (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.colorBox, { backgroundColor: greenShades[index % greenShades.length] }]} />
                                    <Text style={styles.legendText}>
                                        {item.name}: {parseFloat(item.consumption).toFixed(2)} kWh ({percent}%)
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    chartWrapper: {
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontStyle: 'italic',
        paddingVertical: 20,
    },
    legendContainer: {
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'flex-start',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    colorBox: {
        width: 12,
        height: 12,
        borderRadius: 2,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        paddingRight: 100,
        color: '#333',
    },
});
