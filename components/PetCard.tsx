import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PetCardProps {
  name: string;
  breed: string;
  image: ImageSourcePropType; 
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoriteToggle?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({
  name,
  breed,
  image,
  isFavorite = false,
  onPress,
  onFavoriteToggle
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.breed}>{breed}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={onFavoriteToggle}
        activeOpacity={0.8}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "#8A56E3" : "#8A56E3"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E4E3', // Tom rosa claro
    borderRadius: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopRightRadius: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  breed: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PetCard;