import React from 'react';
import { View, StyleSheet } from 'react-native';
import InfoCard from './InfoCard';

interface InfoSectionProps {
  gender: string;
  breed: string;
  age: string;
  weight: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ gender, breed, age, weight }) => {
  return (
    <View style={styles.container}>
      <InfoCard label="Sexo" value={gender} />
      <InfoCard label="Raça" value={breed} />
      <InfoCard label="Idade" value={age} />
      <InfoCard label="Peso" value={weight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});

export default InfoSection;