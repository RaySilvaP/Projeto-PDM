import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VaccinationCardProps {
  code: string;
}

const VaccinationCard: React.FC<VaccinationCardProps> = ({ code }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>{code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  code: {
    fontSize: 14,
    color: '#555',
  },
});

export default VaccinationCard;