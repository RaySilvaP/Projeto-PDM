import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationSelectorProps {
  currentLocation: string;
  onChangeLocation?: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  currentLocation, 
  onChangeLocation 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onChangeLocation}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>Localização atual</Text>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>{currentLocation}</Text>
        <Ionicons name="chevron-forward" size={16} color="#666" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
});

export default LocationSelector;