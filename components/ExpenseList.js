import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { styles } from '../styles/styles';

const ExpenseList = ({ expenses, onFilterPress, onDeleteExpense }) => {
  const getCategoryInfo = (categoryId) => 
    CATEGORIES.find(cat => cat.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];

  const renderExpenseItem = ({ item }) => {
    const category = getCategoryInfo(item.category);
    return (
      <TouchableOpacity
        style={styles.expenseItem}
        onLongPress={() => onDeleteExpense(item.id)}
      >
        <View style={styles.expenseLeft}>
          <Text style={styles.expenseIcon}>{category.icon}</Text>
          <View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
            <Text style={styles.expenseCategory}>{category.name}</Text>
            <Text style={styles.expenseDate}>{item.date}</Text>
          </View>
        </View>
        <Text style={styles.expenseAmount}>฿{item.amount.toLocaleString()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>รายการค่าใช้จ่าย ({expenses.length})</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <Text style={styles.filterButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={renderExpenseItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseList;