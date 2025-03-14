import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditButton from '@/components/EditButton';

interface PetProfileHeaderProps {
  name: string;
  location: string;
  image: ImageSourcePropType;
  onEditPress: () => void;
}

const PetProfileHeader: React.FC<PetProfileHeaderProps> = ({
  name,
  location,
  image,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#999" />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
      <EditButton onPress={onEditPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
});

export default PetProfileHeader;