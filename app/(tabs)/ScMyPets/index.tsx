import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router'; 
import axios from 'axios';

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
}

function ScMyPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const primaryColor = useThemeColor({}, 'primary');
  const router = useRouter();
  
  // TOKEN - MUDAR PARA FORMA QUE FOI MOSTRADO EM SALA DE AULA
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMDI2MjdiNGE5MDYzZGNkNGQ2NzNhIiwicm9sZSI6IlVzZXIifSwiaWF0IjoxNzQxOTI0Mzk0LCJleHAiOjE3NDE5NjAzOTR9.T9uT_vxxxO-cfFTQS-qAjO_amaJawEuBjsCKybxXhYY'; // Token do usuário

  // CARREGA OS PETS DO BANCO USANDO A API
  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      // MEU IP DA MINHA MÁQUINA, SÓ TROCAR PELO DE VOCÊS
      const response = await axios.get('http://192.168.2.4:3000/pets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Resposta da API:', response.data);
      setPets(response.data);
    } catch (err: any) {
      setError('Erro ao carregar os pets');
      console.error('Erro na requisição:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  // RECARREGA OS PETS SEMPRE QUE A TELA GANHA FOCO
  useFocusEffect(
    React.useCallback(() => {
      fetchPets();
    }, [])
  );

  // LISTA OS PETS QUE FORAM CARREGADOS
  const renderPetItem = ({ item }: { item: Pet }) => {
    if (!item._id) {
      return null;
    }
      console.log(item)
    return (
      <View style={styles.petItem}>
        <TouchableOpacity
          style={styles.petInfoContainer}
          onPress={() => router.push({ pathname: '/PetDetails', params: { id: item._id } })}
        >
          {/* MONTANDO AS FOTOS */}
          <Image
            source={{
              uri: item.photos && item.photos.length > 0
                ? `http://192.168.2.4:3000/uploads/${item.photos[item.photos.length-1]}?${Date.now()}` // Adiciona timestamp para evitar cache
                : 'https://www.example.com/placeholder.jpg', // Imagem de fallback
            }}
            style={styles.petImage}
          />

          <View style={styles.petInfo}>
            <ThemedText type="subtitle" style={styles.petName}>{item.name}</ThemedText>
            <ThemedText>Raça: {item.breed}</ThemedText>
            <ThemedText>Idade: {item.age} anos</ThemedText>
            <ThemedText>Peso: {item.weight || 'N/A'} kg</ThemedText>
            <ThemedText>Espécie: {item.specie}</ThemedText>
            <ThemedText>Sexo: {item.sex}</ThemedText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push({ pathname: '/ScPetForms', params: { id: item._id } })}
        >
          <Ionicons name="create-outline" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.petInfoContainer}
          onPress={() => router.back()}
        >
          <Ionicons name="paw" size={24} color={primaryColor} />
        </TouchableOpacity>
        <ThemedText type="title" style={[styles.title, { color: primaryColor, marginLeft: 10 }]}>
          Meus Pets
        </ThemedText>
        <TouchableOpacity onPress={() => router.push('/ScPetForms')}>
          <Ionicons name="add-circle" size={32} color={primaryColor} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={primaryColor} />
      ) : error ? (
        <ThemedText style={{ color: 'red' }}>{error}</ThemedText>
      ) : pets.length > 0 ? (
        <FlatList
          data={pets}
          keyExtractor={(item) => item._id}
          renderItem={renderPetItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <ThemedText>Você ainda não cadastrou nenhum pet.</ThemedText>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/ScPetForms')}
          >
            <ThemedText lightColor="white">Adicionar Pet</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: '50%',
  },
  list: {
    paddingBottom: 20,
  },
  petItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  petInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginRight: 16,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#775CE5',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
});

export default ScMyPets;