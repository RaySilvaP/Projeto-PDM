import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VaccinationCard from '@/components/VaccinationCard';

interface VaccinationSectionProps {
  vaccinations: string[];
  onAddPress: () => void;
}

const VaccinationSection: React.FC<VaccinationSectionProps> = ({ vaccinations, onAddPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vacinas</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {vaccinations.map((vaccination, index) => (
          <VaccinationCard key={index} code={vaccination} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7140FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    flexWrap: 'wrap',
  },
});

export default VaccinationSection;