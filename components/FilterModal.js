import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CATEGORIES } from '../constants/categories';
import { styles } from '../styles/styles';

const { width } = Dimensions.get('window');

const FilterModal = ({ 
  visible, 
  onClose, 
  filterCategory, 
  setFilterCategory,
  filterPeriod, 
  setFilterPeriod,
  sortBy, 
  setSortBy 
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { width: width - 40 }]}>
          <Text style={styles.modalTitle}>กรองและเรียงลำดับ</Text>
          
          <Text style={styles.label}>หมวดหมู่</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filterCategory}
              onValueChange={setFilterCategory}
              style={styles.picker}
            >
              <Picker.Item label="ทั้งหมด" value="all" />
              {CATEGORIES.map(cat => (
                <Picker.Item key={cat.id} label={`${cat.icon} ${cat.name}`} value={cat.id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>ช่วงเวลา</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filterPeriod}
              onValueChange={setFilterPeriod}
              style={styles.picker}
            >
              <Picker.Item label="ทั้งหมด" value="all" />
              <Picker.Item label="วันนี้" value="today" />
              <Picker.Item label="7 วันที่ผ่านมา" value="week" />
              <Picker.Item label="30 วันที่ผ่านมา" value="month" />
            </Picker>
          </View>

          <Text style={styles.label}>เรียงลำดับ</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sortBy}
              onValueChange={setSortBy}
              style={styles.picker}
            >
              <Picker.Item label="วันที่ (ใหม่ → เก่า)" value="date_desc" />
              <Picker.Item label="วันที่ (เก่า → ใหม่)" value="date_asc" />
              <Picker.Item label="จำนวนเงิน (มาก → น้อย)" value="amount_desc" />
              <Picker.Item label="จำนวนเงิน (น้อย → มาก)" value="amount_asc" />
            </Picker>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;