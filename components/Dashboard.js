import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import CustomPieChart from './CustomPieChart';
import { styles } from '../styles/styles';

const Dashboard = ({ stats, onFilterPress }) => {
  const { total, categoryStats, count } = stats;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>สรุปค่าใช้จ่าย</Text>
        <Text style={styles.totalAmount}>฿{total.toLocaleString()}</Text>
        <Text style={styles.summarySubtitle}>รายการทั้งหมด {count} รายการ</Text>
      </View>

      {/* Filter Button */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <Text style={styles.filterButtonText}>🔍 กรองข้อมูล</Text>
        </TouchableOpacity>
      </View>

      {/* Pie Chart Section */}
      <CustomPieChart 
        categoryStats={categoryStats} 
        total={total} 
      />

      {/* Category List Section */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>รายละเอียดแยกตามหมวดหมู่</Text>
        {categoryStats.map(cat => (
          <View key={cat.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryAmount}>฿{cat.total.toLocaleString()}</Text>
              </View>
              <View style={styles.categoryStats}>
                <Text style={styles.categoryPercentage}>{cat.percentage}%</Text>
                <Text style={styles.categoryCount}>{cat.count} รายการ</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${cat.percentage}%`, backgroundColor: cat.color }
                ]}
              />
            </View>
          </View>
        ))}
        
        {categoryStats.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              📝 ยังไม่มีรายการค่าใช้จ่าย
            </Text>
            <Text style={styles.noDataSubtext}>
              เริ่มต้นโดยการเพิ่มรายการแรกของคุณ
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Dashboard;