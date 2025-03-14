import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Arrow from '@/components/Arrow';
import PetProfileHeader from '@/components/PetProfileHeader';
import InfoSection from '@/components/InfoSection';
import DescriptionCard from '@/components/DescriptionCard';
import VaccinationSection from '@/components/VaccinationSection';


const dogImage = require('@/assets/images/petdog.png'); 

const PetDetails: React.FC = () => {
 
  const petData = {
    name: 'Bolinha',
    location: 'Cajazeiras - PB',
    image: dogImage, 
    gender: 'Macho',
    breed: 'Pitbull',
    age: '2 anos',
    weight: '45.450kg',
    description: 'Por ser um pitbull, é muito dócil e amigável.',
    vaccinations: ['30023010', '30023050', '30023070'],
  };

  const handleBackPress = () => {
    // Lógica para voltar para a tela anterior
    console.log('Back button pressed');
  };

  const handleEditPress = () => {
    // Lógica para editar o perfil do pet
    console.log('Edit button pressed');
  };

  const handleAddVaccination = () => {
    // Lógica para adicionar nova vacina
    console.log('Add vaccination button pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Arrow onBackPress={handleBackPress} />
        <PetProfileHeader
          name={petData.name}
          location={petData.location}
          image={petData.image}
          onEditPress={handleEditPress}
        />
        <InfoSection
          gender={petData.gender}
          breed={petData.breed}
          age={petData.age}
          weight={petData.weight}
        />
        <DescriptionCard description={petData.description} />
        <VaccinationSection
          vaccinations={petData.vaccinations}
          onAddPress={handleAddVaccination}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
});

export default PetDetails;