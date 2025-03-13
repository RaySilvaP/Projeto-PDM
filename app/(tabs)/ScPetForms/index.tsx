import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { AlertModal } from '@/components/AlertModal';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

// ESTRUTURA DO PET
interface Pet {
  _id?: string;
  name: string;
  breed: string;
  age: number;
  weight?: number;
  specie: string;
  sex: string;
  photos?: string[];
}

export default function ScPetForms() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [specie, setSpecie] = useState('');
  const [sex, setSex] = useState('Male');
  const [photos, setPhotos] = useState<string[]>([]);
  const [tempImage, setTempImage] = useState<string | null>(null); // Armazenamento temporário da imagem
  const [loading, setLoading] = useState(false); // Estado para carregamento
  const alertRef = useRef<any>(null);

  // TOKEN - MUDAR PARA FORMA QUE FOI MOSTRADO EM SALA DE AULA
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMDI2MjdiNGE5MDYzZGNkNGQ2NzNhIiwicm9sZSI6IlVzZXIifSwiaWF0IjoxNzQxODczNzAzLCJleHAiOjE3NDE5MDk3MDN9.tGrNRaX06GPJf4hB6HUdMIonzIFNx1fj2m3P8XcETDU'; // Token do usuário

  // PARA LIMPAR OS CAMPOS QUANDO FOR ADICIONAR
  useEffect(() => {
    if (!id) {
      setName('');
      setBreed('');
      setAge('');
      setWeight('');
      setSpecie('');
      setSex('Male');
      setPhotos([]);
    }
  }, [id]);

  // PEGA OS DADOS DO PET SE FOI EDITAR
  useEffect(() => {
    if (id) {
      fetchPetDetails(id);
    }
  }, [id]);

  // BUSCANDO DADOS DO PET PELO ID NA API
  const fetchPetDetails = async (petId: string) => {
    try {
      const response = await axios.get(`http://192.168.2.4:3000/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pet = response.data;
      setName(pet.name);
      setBreed(pet.breed);
      setAge(pet.age.toString());
      setWeight(pet.weight?.toString() || '');
      setSpecie(pet.specie);
      setSex(pet.sex);
      setPhotos(pet.photos || []);
    } catch (err) {
      console.error('Erro ao buscar detalhes do pet:', err);
    }
  };

  // MODO TELA CHEIA
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  // FUNÇÃO PARA SELECIONAR IMAGEM DA GALERIA
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar a galeria!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Reduz a qualidade para 50%
    });

    if (!result.canceled) {
      setTempImage(result.assets[0].uri); // Armazena temporariamente a imagem
    }
  };

  // FUNÇÃO PARA TIRAR FOTO COM A CÂMERA
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Reduz a qualidade para 50%
    });

    if (!result.canceled) {
      setTempImage(result.assets[0].uri); // Armazena temporariamente a imagem
    }
  };

  // FUNÇÃO PARA ENVIAR IMAGEM PARA A API
  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('picture', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await axios.post(`http://192.168.2.4:3000/pets/${id || 'new'}/pictures`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000, // Define um timeout de 10 segundos para a requisição
      });

      return response.data[0]; // Retorna a URL da imagem enviada
    } catch (err) {
      console.error('Erro ao enviar a imagem:', err);
      throw new Error('Erro ao enviar a imagem. Verifique sua conexão e tente novamente.');
    }
  };

  // FUNÇÃO PARA EXCLUIR IMAGEM
  const deleteImage = async (file: string) => {
    try {
      await axios.delete(`http://192.168.2.4:3000/pets/${id}/pictures/${file}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualiza o estado local removendo a imagem excluída
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo !== file));
    } catch (err) {
      console.error('Erro ao excluir a imagem:', err);
    }
  };

  const handleSavePet = async () => {
    if (!name || !breed || !age || !specie || !sex) {
      alertRef.current?.setVisible('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true); // Inicia o carregamento

    // Se houver uma imagem temporária, faz o upload e adiciona ao array de fotos
    if (tempImage) {
      try {
        const uploadedUrl = await uploadImage(tempImage);
        if (uploadedUrl) {
          const updatedPhotos = [...photos];
          updatedPhotos.splice(0, 0, uploadedUrl); // Adiciona a nova imagem na posição 0
          setPhotos(updatedPhotos);
        }
      } catch (err) {
        alert('Erro ao enviar a imagem. Verifique sua conexão e tente novamente.');
        console.error('Erro ao enviar a imagem:', err);
        setLoading(false);
        return;
      }
    }

    const parsedAge = parseInt(age);
    const parsedWeight = weight ? parseFloat(weight) : undefined;
    const validPhotos = Array.isArray(photos) ? photos : [];

    const petData = {
      name,
      breed,
      age: parsedAge,
      weight: parsedWeight,
      specie,
      sex,
      photos: validPhotos,
    };

    try {
      if (id) {
        const response = await axios.put(`http://192.168.2.4:3000/pets/${id}`, petData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Resposta da API (PUT):', response.data);
        alertRef.current?.setVisible('Pet atualizado com sucesso!');
      } else {
        const response = await axios.post('http://192.168.2.4:3000/pets', { pets: [petData] }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Resposta da API (POST):', response.data);
        alertRef.current?.setVisible('Pet adicionado com sucesso!');
      }

      // Limpa os campos após salvar
      setName('');
      setBreed('');
      setAge('');
      setWeight('');
      setSpecie('');
      setSex('Male');
      setPhotos([]);
      setTempImage(null);

      setTimeout(() => {
        alertRef.current?.setVisible(false);
      }, 2000);

      setTimeout(() => {
        router.replace('/(tabs)/ScMyPets');
      }, 1000);
    } catch (err: any) {
      console.error('Erro ao salvar o pet:', err.response ? err.response.data : err.message);
      alertRef.current?.setVisible('Erro ao salvar o pet. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: useThemeColor({}, 'background') }]}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* CABEÇALHO */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/ScMyPets')}>
              <Ionicons name="arrow-back" size={24} color={useThemeColor({}, 'primary')} />
            </TouchableOpacity>
            <ThemedText type="title" style={[styles.title, { color: useThemeColor({}, 'primary'), marginLeft: 10 }]}>
              {id ? 'Editar Pet' : 'Novo Pet'}
            </ThemedText>
          </View>

          {/* UPLOAD DAS FOTOS */}
          <View style={styles.imageUploadContainer}>
            {(tempImage || photos.length > 0) && (
              <View>
                <Image
                  source={{
                    uri: tempImage || `http://192.168.2.4:3000/uploads/${photos[photos.length-1]}?${Date.now()}`, // Adiciona timestamp para evitar cache
                  }}
                  style={styles.image}
                  onError={(e) => {
                    console.log('Erro ao carregar a imagem:', e.nativeEvent.error);
                  }}
                />
                {!tempImage && photos.length > 0 && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteImage(photos[0])} // Exclui a primeira imagem
                  >
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* BOTÕES DE UPLOAD */}
            <TouchableOpacity
              onPress={pickImage}
              style={[styles.addButton, { backgroundColor: useThemeColor({}, 'primary') }]}
            >
              <ThemedText lightColor="white">Escolher da Galeria</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhoto}
              style={[styles.addButton, { backgroundColor: useThemeColor({}, 'primary') }]}
            >
              <ThemedText lightColor="white">Tirar Foto</ThemedText>
            </TouchableOpacity>
          </View>

          {/* FORMULÁRIO DO PET */}
          <ThemedTextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={[styles.input, { borderColor: useThemeColor({}, 'stroke') }]}
            placeholderTextColor={useThemeColor({}, 'placeholder')}
          />
          <ThemedTextInput
            placeholder="Raça"
            value={breed}
            onChangeText={setBreed}
            style={[styles.input, { borderColor: useThemeColor({}, 'stroke') }]}
            placeholderTextColor={useThemeColor({}, 'placeholder')}
          />
          <ThemedTextInput
            placeholder="Idade (em anos)"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={[styles.input, { borderColor: useThemeColor({}, 'stroke') }]}
            placeholderTextColor={useThemeColor({}, 'placeholder')}
          />
          <ThemedTextInput
            placeholder="Peso (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={[styles.input, { borderColor: useThemeColor({}, 'stroke') }]}
            placeholderTextColor={useThemeColor({}, 'placeholder')}
          />
          <ThemedTextInput
            placeholder="Espécie"
            value={specie}
            onChangeText={setSpecie}
            style={[styles.input, { borderColor: useThemeColor({}, 'stroke') }]}
            placeholderTextColor={useThemeColor({}, 'placeholder')}
          />

          {/* BOTÕES DE SEXO */}
          <ThemedText type="subtitle" style={{ color: useThemeColor({}, 'primary'), textAlign: 'center' }}>Sexo</ThemedText>
          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              style={[styles.genderButton, sex === 'Male' && { backgroundColor: useThemeColor({}, 'primary') }]}
              onPress={() => setSex('Male')}
            >
              <ThemedText style={sex === 'Male' ? { color: 'white' } : { color: useThemeColor({}, 'primary') }}>Macho</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, sex === 'Female' && { backgroundColor: useThemeColor({}, 'primary') }]}
              onPress={() => setSex('Female')}
            >
              <ThemedText style={sex === 'Female' ? { color: 'white' } : { color: useThemeColor({}, 'primary') }}>Fêmea</ThemedText>
            </TouchableOpacity>
          </View>

          {/* BOTÃO DE ADICIONAR */}
          <TouchableOpacity onPress={handleSavePet} style={[styles.addButton, { backgroundColor: useThemeColor({}, 'primary') }]}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemedText lightColor="white">{id ? 'Salvar Alterações' : 'Adicionar Pet'}</ThemedText>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL PARA CONFIRMAR */}
      <AlertModal
        ref={alertRef}
        text={id ? 'Pet atualizado com sucesso!' : 'Pet adicionado com sucesso!'}
        type="success"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'stretch',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageUploadContainer: {
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    marginVertical: 5,
    alignSelf: 'stretch',
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  genderButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    width: '40%',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
});