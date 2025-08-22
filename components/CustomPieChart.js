import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { styles } from '../styles/styles';

const { width } = Dimensions.get('window');

const CustomPieChart = ({ categoryStats, total }) => {
  const size = Math.min(width - 80, 200);
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;
  
  if (categoryStats.length === 0 || total === 0) {
    return (
      <View style={styles.pieChartContainer}>
        <Text style={styles.noDataText}>ยังไม่มีข้อมูลค่าใช้จ่าย</Text>
      </View>
    );
  }

  // คำนวณ stroke-dasharray สำหรับแต่ละส่วน
  const circumference = 2 * Math.PI * radius;
  let cumulativePercentage = 0;
  
  const segments = categoryStats.map((cat) => {
    const percentage = (cat.total / total) * 100;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativePercentage / 100 * circumference;
    
    const segment = {
      ...cat,
      percentage,
      strokeDasharray,
      strokeDashoffset,
    };
    
    cumulativePercentage += percentage;
    return segment;
  });

  return (
    <View style={styles.pieChartContainer}>
      <Text style={styles.chartTitle}>สัดส่วนค่าใช้จ่ายตามหมวดหมู่</Text>
      
      <View style={styles.chartWrapper}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="4"
          />
          
          {/* Pie segments */}
          {segments.map((segment, index) => (
            <Circle
              key={segment.id}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${centerX} ${centerY})`}
            />
          ))}
          
          {/* Center text */}
          <SvgText
            x={centerX}
            y={centerY - 10}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            fill="#2c3e50"
          >
            รวม
          </SvgText>
          <SvgText
            x={centerX}
            y={centerY + 10}
            fontSize="14"
            textAnchor="middle"
            fill="#27ae60"
            fontWeight="bold"
          >
            ฿{total.toLocaleString()}
          </SvgText>
        </Svg>
      </View>
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        {segments.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View 
              style={[
                styles.legendColor, 
                { backgroundColor: item.color }
              ]} 
            />
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendText}>
                {item.icon} {item.name}
              </Text>
              <Text style={styles.legendAmount}>
                ฿{item.total.toLocaleString()} ({item.percentage.toFixed(1)}%)
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomPieChart;