import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type UserLocation = {
  latitude: number;
  longitude: number;
} | null;

export default function LocationScreen() {
  const theme = useColorScheme() ?? 'light';

  const [region, setRegion] = useState({
    latitude: -6.8869517014005455,
    longitude: -38.55721367635895,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState<UserLocation>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Você precisa permitir o acesso à localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
      >
        <Marker
          coordinate={{ latitude: -6.8869517014005455, longitude: -38.55721367635895 }}
          title="Seu Local"
          description="Local cadastrado pelo usuário"
        >
          <MaterialCommunityIcons name="home" size={40} color="blue" />
        </Marker>

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Você"
            description="Você está aqui"
          >
            <MaterialCommunityIcons name="paw" size={40} color="red" />
          </Marker>
        )}
      </MapView>

      <View style={styles.overlay}>
        <MaterialCommunityIcons name="paw" size={40} color="#800080" style={styles.icon} />
        <ThemedText type="title" style={styles.overlayTitle}>
          DoggyConnect
        </ThemedText>
        <ThemedText type="default" style={styles.overlaySubtitle}>
          Conecte seu melhor amigo
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    backgroundColor: Colors.light.backgroundCard,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#800080',
  },
  overlaySubtitle: {
    fontSize: 16,
    color: Colors.light.placeholder,
    textAlign: 'center',
  },
});