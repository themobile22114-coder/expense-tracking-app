import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CATEGORIES } from '../constants/categories';
import { getCurrentDate } from '../utils/dateUtils';
import { styles } from '../styles/styles';

const { width } = Dimensions.get('window');

const AddExpenseModal = ({ visible, onClose, onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const handleSubmit = () => {
    if (!amount || !description) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      description,
      category: selectedCategory,
      date: selectedDate,
    };

    onAddExpense(expenseData);
    
    // รีเซ็ตฟอร์ม
    setAmount('');
    setDescription('');
    setSelectedCategory('food');
    setSelectedDate(getCurrentDate());
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { width: width - 40 }]}>
          <Text style={styles.modalTitle}>เพิ่มค่าใช้จ่าย</Text>
          
          <Text style={styles.label}>จำนวนเงิน</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
            // เอาเฉพาะตัวเลขและจุดทศนิยม
            const numericText = text.replace(/[^0-9.]/g, '');
            setAmount(numericText);
            }}
            keyboardType="numeric"
            placeholder="0.00"
        />



          <Text style={styles.label}>รายละเอียด</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="ระบุรายละเอียด..."
          />

          <Text style={styles.label}>หมวดหมู่</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              style={styles.picker}
            >
              {CATEGORIES.map(cat => (
                <Picker.Item key={cat.id} label={`${cat.icon} ${cat.name}`} value={cat.id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>วันที่</Text>
          <TextInput
            style={styles.input}
            value={selectedDate}
            onChangeText={setSelectedDate}
            placeholder="YYYY-MM-DD"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.saveButtonText}>บันทึก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;