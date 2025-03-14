import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Arrow from '@/components/Arrow';
import PetProfileHeader from '@/components/PetProfileHeader';
import InfoSection from '@/components/InfoSection';
import DescriptionCard from '@/components/DescriptionCard';
import VaccinationSection from '@/components/VaccinationSection';
import { ThemedText } from '@/components/ThemedText';

// ESTRUTURA DO PET
interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  weight?: number;
  specie: string;
  sex: string;
  photos?: string[];
  vaccines?: string[];
  description?: string;
}

const PetDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // Pega o ID do pet da navegação
  const [petData, setPetData] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TOKEN FIXO (TEMPORÁRIO)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMDI2MjdiNGE5MDYzZGNkNGQ2NzNhIiwicm9sZSI6IlVzZXIifSwiaWF0IjoxNzQxOTI0Mzk0LCJleHAiOjE3NDE5NjAzOTR9.T9uT_vxxxO-cfFTQS-qAjO_amaJawEuBjsCKybxXhYY';

  // FUNÇÃO PARA BUSCAR OS DETALHES DO PET
  const fetchPetDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://192.168.2.4:3000/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
        },
      });
      setPetData(response.data);
    } catch (err) {
      setError('Erro ao carregar os detalhes do pet');
      console.error('Erro na requisição:', err);
    } finally {
      setLoading(false);
    }
  };

  // BUSCA OS DETALHES DO PET QUANDO A TELA É CARREGADA
  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  // FUNÇÕES DE NAVEGAÇÃO E AÇÕES
  const handleBackPress = () => {
    router.replace('/(tabs)/ScMyPets')
  };

  const handleEditPress = () => {
    router.push({ pathname: '/ScPetForms', params: { id: petData?._id } });
  };

  const handleAddVaccination = () => {
    console.log('Add vaccination button pressed');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={{ color: 'red' }}>{error}</ThemedText>
      </SafeAreaView>
    );
  }

  if (!petData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Nenhum pet encontrado.</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Arrow onBackPress={handleBackPress} />
        <PetProfileHeader
          name={petData.name}
          location="Localização não disponível" // Substitua por um campo real se existir
          image={{ uri: petData.photos && petData.photos.length > 0 ? `http://192.168.2.4:3000/uploads/${petData.photos[0]}` : 'https://via.placeholder.com/150' }}
          onEditPress={handleEditPress}
        />
        <InfoSection
          gender={petData.sex}
          breed={petData.breed}
          age={`${petData.age} anos`}
          weight={`${petData.weight || 'N/A'} kg`}
        />
        <DescriptionCard description={petData.description || 'Nenhuma descrição disponível.'} />
        <VaccinationSection
          vaccinations={petData.vaccines || []}
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
    paddingTop:30,
    flex: 1,
  },
});

export default PetDetails;