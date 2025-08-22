import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import AddExpenseModal from './components/AddExpenseModal';
import FilterModal from './components/FilterModal';
import { useExpenses } from './hooks/useExpenses';
import { styles } from './styles/styles';

const App = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');

  // Custom hook
  const {
    expenses,
    addExpense,
    deleteExpense,
    getFilteredExpenses,
    calculateStats,
  } = useExpenses();

  // Get filtered data
  const filteredExpenses = getFilteredExpenses(filterCategory, filterPeriod, sortBy);
  const stats = calculateStats(filteredExpenses);

  return (
    <View style={styles.app}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}> 📈 Expense Tracking App</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentTab === 'dashboard' && styles.activeTab]}
          onPress={() => setCurrentTab('dashboard')}
        >
          <Text style={[styles.tabText, currentTab === 'dashboard' && styles.activeTabText]}>
            📊 Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentTab === 'list' && styles.activeTab]}
          onPress={() => setCurrentTab('list')}
        >
          <Text style={[styles.tabText, currentTab === 'list' && styles.activeTabText]}>
            📝 List
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {currentTab === 'dashboard' ? (
        <Dashboard 
          stats={stats} 
          onFilterPress={() => setFilterModalVisible(true)} 
        />
      ) : (
        <ExpenseList 
          expenses={filteredExpenses}
          onFilterPress={() => setFilterModalVisible(true)}
          onDeleteExpense={deleteExpense}
        />
      )}

      {/* Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modals */}
      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExpense={addExpense}
      />
      
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterPeriod={filterPeriod}
        setFilterPeriod={setFilterPeriod}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </View>
  );
};

export default App;