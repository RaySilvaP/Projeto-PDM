import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DescriptionCardProps {
  description: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default DescriptionCard;