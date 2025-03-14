import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, ImageSourcePropType } from 'react-native';

// Import components
import UserHeader from '@/components/UserHeader';
import SearchBar from '@/components/SearchBar';
import LocationSelector from '@/components/LocationSelector';
import DistanceSlider from '@/components/DistanceSlider';
import PetCard from '@/components/PetCard';

// Interface para os dados dos pets
interface Pet {
  id: string;
  name: string;
  breed: string;
  image: ImageSourcePropType;
  isFavorite: boolean;
}

const Home: React.FC = () => {
  // Sample data usando require para imagens locais
  const [pets, setPets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Bolinha',
      breed: 'Pitbull',
      image: require('@/assets/images/dog.png'), 
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Carrasco',
      breed: 'Pitbull',
      image: require('@/assets/images/dog.png'), 
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Max',
      breed: 'Labrador',
      image: require('@/assets/images/dog.png'), 
      isFavorite: false,
    },
  ]);
  
  const [currentLocation, setCurrentLocation] = useState('Cajazeiras - PB');
  
  const toggleFavorite = (id: string) => {
    setPets(prevPets => 
      prevPets.map(pet => 
        pet.id === id ? { ...pet, isFavorite: !pet.isFavorite } : pet
      )
    );
  };

  const handleSearch = (text: string) => {
    // Implement search functionality here
    console.log('Searching for:', text);
  };

  const handleLocationChange = () => {
    // Implement location selection functionality here
    console.log('Changing location');
  };

  const handleDistanceChange = (distance: number) => {
    // Implement distance change functionality here
    console.log('Distance changed to:', distance);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
      <UserHeader 
  name="Manoel Gomes" 
  subtitle="Gerencie os perfis dos seus cãezinhos" 
  avatarImage={require('@/assets/images/pic(1).png')} 
/>
        
        <SearchBar placeholder="Buscar pets..." onSearch={handleSearch} />
        
        <LocationSelector 
          currentLocation={currentLocation} 
          onChangeLocation={handleLocationChange} 
        />
        
        <DistanceSlider 
          initialValue={50} 
          maxValue={100} 
          onChange={handleDistanceChange} 
        />
        
        <View style={styles.petsContainer}>
          {pets.map(pet => (
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
});

export default Home;