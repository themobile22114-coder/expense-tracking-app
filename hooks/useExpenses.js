import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // นำเข้า AsyncStorage
import { CATEGORIES } from '../constants/categories';
import { getDateRange } from '../utils/dateUtils';

const STORAGE_KEY = '@expense_tracker_expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // เพิ่มสถานะเพื่อเช็คว่าโหลดข้อมูลเสร็จหรือยัง

  // โหลดข้อมูลเมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const savedExpenses = jsonValue != null ? JSON.parse(jsonValue) : [];
        setExpenses(savedExpenses);
      } catch (e) {
        console.error("Failed to load expenses from storage", e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadExpenses();
  }, []);

  // บันทึกข้อมูลทุกครั้งที่ expenses มีการเปลี่ยนแปลง
  useEffect(() => {
    if (isLoaded) {
      const saveExpenses = async () => {
        try {
          const jsonValue = JSON.stringify(expenses);
          await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (e) {
          console.error("Failed to save expenses to storage", e);
        }
      };

      saveExpenses();
    }
  }, [expenses, isLoaded]);

  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expenseData,
      timestamp: new Date().getTime(),
    };
    setExpenses(prev => [...prev, newExpense]);
    Alert.alert('สำเร็จ', 'บันทึกค่าใช้จ่ายเรียบร้อยแล้ว');
  };

  const deleteExpense = (id) => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณต้องการลบรายการนี้หรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { 
          text: 'ลบ', 
          onPress: () => setExpenses(prev => prev.filter(exp => exp.id !== id))
        },
      ]
    );
  };

  const getFilteredExpenses = (filterCategory, filterPeriod, sortBy) => {
    let filtered = [...expenses];

    // กรองตามหมวดหมู่
    if (filterCategory !== 'all') {
      filtered = filtered.filter(exp => exp.category === filterCategory);
    }

    // กรองตามช่วงเวลา
    if (filterPeriod !== 'all') {
      const dateRange = getDateRange(filterPeriod);
      if (filterPeriod === 'today') {
        filtered = filtered.filter(exp => exp.date === dateRange);
      } else if (dateRange) {
        filtered = filtered.filter(exp => new Date(exp.date) >= dateRange);
      }
    }

    // เรียงลำดับ
    switch (sortBy) {
      case 'date_desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount_desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount_asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
    }

    return filtered;
  };

  const calculateStats = (filteredExpenses) => {
    const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const categoryStats = CATEGORIES.map(cat => {
      const categoryExpenses = filteredExpenses.filter(exp => exp.category === cat.id);
      const categoryTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return {
        ...cat,
        total: categoryTotal,
        count: categoryExpenses.length,
        percentage: total > 0 ? (categoryTotal / total * 100).toFixed(1) : 0,
      };
    }).filter(cat => cat.total > 0).sort((a, b) => b.total - a.total);

    return { total, categoryStats, count: filteredExpenses.length };
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    getFilteredExpenses,
    calculateStats,
  };
};