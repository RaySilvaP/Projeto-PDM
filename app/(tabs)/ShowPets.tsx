/*import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, ImageSourcePropType, ActivityIndicator } from 'react-native';
import UserHeader from '@/components/UserHeader';
import SearchBar from '@/components/SearchBar';
import LocationSelector from '@/components/LocationSelector';
import DistanceSlider from '@/components/DistanceSlider';
import PetCard from '@/components/PetCard';
import api from '../API/axios';
import * as Location from 'expo-location';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '../contexts/AuthContext';

interface Pet {
  id: string;
  name: string;
  breed: string;
  image: ImageSourcePropType;
  isFavorite: boolean;
  sex: string;
  location: {
    coordinates: [number, number];
  };
}

interface User {
  id: string;
  name: string;
  subtitle?: string;
  avatarImage?: string;
}

const Home: React.FC = () => {
  const { token } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentLocation, setCurrentLocation] = useState('Cajazeiras - PB');
  const [searchQuery, setSearchQuery] = useState('');
  const [distance, setDistance] = useState(50);
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);
  const [lastPet, setLastPet] = useState<Pet | null>(null);
  const [similarPets, setSimilarPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      if (!token) {
        setError('Token não encontrado');
        return;
      }

      const response = await api.get(`/user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setError('Erro ao carregar dados do usuário');
    }
  };

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização negada');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserCoordinates([latitude, longitude]);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  const fetchPets = async () => {
    try {
      if (!token) {
        setError('Token não encontrado');
        return;
      }

      const response = await api.get('/pets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: searchQuery, distance },
      });
      setPets(response.data);

      if (response.data.length > 0) {
        setLastPet(response.data[response.data.length - 1]);
      }
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      setError('Erro ao carregar pets');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarPets = async () => {
    if (!lastPet || !token) return;

    try {
      const response = await api.get('/pets/similar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { breed: lastPet.breed, sex: lastPet.sex === 'Male' ? 'Female' : 'Male' },
      });
      setSimilarPets(response.data);
    } catch (error) {
      console.error('Erro ao buscar pets similares:', error);
    }
  };

  const fetchNearbyPets = async () => {
    if (!userCoordinates || !token) return;

    try {
      const response = await api.get('/pets/nearby', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { latitude: userCoordinates[0], longitude: userCoordinates[1], distance },
      });
      setPets(response.data);
    } catch (error) {
      console.error('Erro ao buscar pets próximos:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserLocation();
  }, [token]);

  useEffect(() => {
    fetchPets();
    fetchNearbyPets();
  }, [searchQuery, distance, userCoordinates, token]);

  useEffect(() => {
    if (lastPet) {
      fetchSimilarPets();
    }
  }, [lastPet, token]);

  const toggleFavorite = async (id: string) => {
    try {
      if (!token) return;

      await api.post(`/pets/${id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === id ? { ...pet, isFavorite: !pet.isFavorite } : pet
        )
      );
    } catch (error) {
      console.error('Erro ao curtir pet:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleLocationChange = () => {
    console.log('Changing location');
  };

  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText style={{ color: 'red' }}>{error}</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserHeader
          name={user?.name || 'Usuário'}
          subtitle={user?.subtitle || 'Gerencie os perfis dos seus cãezinhos'}
          avatarImage={user?.avatarImage ? { uri: user.avatarImage } : undefined}
        />
        <SearchBar placeholder="Buscar pets..." onSearch={handleSearch} />
        <LocationSelector
          currentLocation={currentLocation}
          onChangeLocation={handleLocationChange}
        />
        <DistanceSlider
          initialValue={distance}
          maxValue={100}
          onChange={handleDistanceChange}
        />
        <View style={styles.petsContainer}>
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              image={pet.image}
              isFavorite={pet.isFavorite}
              onPress={() => console.log('Selected pet:', pet.name)}
              onFavoriteToggle={() => toggleFavorite(pet.id)}
            />
          ))}
        </View>
        {lastPet && (
          <View style={styles.section}>
            <ThemedText type="title">Último Pet Cadastrado</ThemedText>
            <PetCard
              name={lastPet.name}
              breed={lastPet.breed}
              image={lastPet.image}
              isFavorite={lastPet.isFavorite}
              onPress={() => console.log('Selected pet:', lastPet.name)}
              onFavoriteToggle={() => toggleFavorite(lastPet.id)}
            />
          </View>
        )}
        {similarPets.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="title">Pets Similares</ThemedText>
            {similarPets.map((pet) => (
              <PetCard
                key={pet.id}
                name={pet.name}
                breed={pet.breed}
                image={pet.image}
                isFavorite={pet.isFavorite}
                onPress={() => console.log('Selected pet:', pet.name)}
                onFavoriteToggle={() => toggleFavorite(pet.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  petsContainer: {
    paddingVertical: 8,
  },
  section: {
    marginTop: 16,
  },
});

export default Home;*/