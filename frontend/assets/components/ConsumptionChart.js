// components/ConsumptionChart.js
//Graficos de consumo diário, semanal e mensal
import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ConsumptionChart = ({ tipo }) => {
    let titulo = '';
    let labels = [];
    let dados = [];

    switch (tipo) {
        case 'diario':
            titulo = 'Consumo Diário (kWh)';
            labels = ['0h', '6h', '12h', '18h', '24h'];
            dados = [2, 3, 2.5, 4, 3.2];
            break;
        case 'semanal':
            titulo = 'Consumo Semanal (kWh)';
            labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
            dados = [12, 10, 14, 9, 13, 8, 11];
            break;
        case 'mensal':
        default:
            titulo = 'Consumo Mensal (kWh)';
            labels = ['01', '05', '10', '15', '20', '25', '30'];
            dados = [80, 120, 90, 110, 130, 100, 95];
            break;
    }

    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginBottom: 10 }}>{titulo}</Text>
            <LineChart
                data={{
                    labels,
                    datasets: [{ data: dados }],
                }}
                width={screenWidth - 20}
                height={250}
                yAxisSuffix="kWh"
                chartConfig={{
                    backgroundColor: '#e0f5e8',
                    backgroundGradientFrom: '#f0fff4',
                    backgroundGradientTo: '#e0f5e8',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`,
                    labelColor: () => '#000000',
                    propsForDots: { r: '5', strokeWidth: '2', stroke: '#00C853' },
                }}
                style={{ borderRadius: 5 }}
            />
        </View>
    );
};

export default ConsumptionChart;
