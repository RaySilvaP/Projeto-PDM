import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

interface DistanceSliderProps {
  initialValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
}

const DistanceSlider: React.FC<DistanceSliderProps> = ({ 
  initialValue = 50, 
  maxValue = 100,
  onChange 
}) => {
  const [distance, setDistance] = useState(initialValue);
  const [alwaysShow, setAlwaysShow] = useState(true);

  const handleValueChange = (value: number) => {
    setDistance(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferência de distância</Text>
      
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={maxValue}
          value={distance}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#7140FD"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#7140FD"
          step={1}
        />
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={styles.distanceValue}>{Math.round(distance)}km</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Monstrar sempre nesta faixa</Text>
          <Switch
            value={alwaysShow}
            onValueChange={setAlwaysShow}
            trackColor={{ false: '#E5E5E5', true: '#7140FD' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sliderContainer: {
    marginVertical: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  }
});

export default DistanceSlider;