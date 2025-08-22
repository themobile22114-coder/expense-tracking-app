import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { styles } from '../styles/styles';

const { width } = Dimensions.get('window');

const ExpensePieChart = ({ categoryStats, total }) => {
  // เตรียมข้อมูลสำหรับ PieChart
  const chartData = categoryStats.map((cat, index) => ({
    name: cat.name,
    population: cat.total,
    color: cat.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  // กำหนดค่า config สำหรับ chart
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  if (chartData.length === 0) {
    return (
      <View style={styles.pieChartContainer}>
        <Text style={styles.noDataText}>ยังไม่มีข้อมูลค่าใช้จ่าย</Text>
      </View>
    );
  }

  return (
    <View style={styles.pieChartContainer}>
      <Text style={styles.chartTitle}>สัดส่วนค่าใช้จ่ายตามหมวดหมู่</Text>
      
      <PieChart
        data={chartData}
        width={width - 60}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
      />
      
      {/* Legend แบบ Custom */}
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View 
              style={[
                styles.legendColor, 
                { backgroundColor: item.color }
              ]} 
            />
            <Text style={styles.legendText}>
              {item.name}: ฿{item.population.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ExpensePieChart;