import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';

const PetForm = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState<'MALE' | 'FEMALE' | null>(null);
  const [observations, setObservations] = useState('');

  

const [image, setImage] = useState<{ uri: string } | null>(null);

const selectImage = () => {
  const options = {
    mediaType: 'photo' as const, // Tipo de mídia (foto)
    includeBase64: false, // Não incluir base64
    maxHeight: 200, // Altura máxima da imagem
    maxWidth: 200, // Largura máxima da imagem
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      Alert.alert('Seleção cancelada', 'Você não selecionou nenhuma imagem.');
    } else if (response.errorMessage) {
      Alert.alert('Erro', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      // Define a imagem selecionada no estado
      if (response.assets[0].uri) {
        setImage({ uri: response.assets[0].uri });
      } else {
        Alert.alert('Erro', 'A URI da imagem está indefinida.');
      }
    }
  });
};

return (
  <View style={styles.container}>
    {/* Círculo para a foto do pet */}
    <TouchableOpacity onPress={selectImage} style={styles.profileCircle}>
      {image ? (
        <Image source={image} style={styles.profileImage} />
      ) : (
        <Text style={styles.placeholderText}>Adicionar Foto</Text>
      )}
    </TouchableOpacity>

    {/* Outros componentes do formulário */}


      <Text style={styles.sexLabel}>Sexo</Text>
      <View style={styles.sexContainer}>
        <TouchableOpacity
          style={[styles.sexButton, sex === 'MALE' && styles.selectedSexButton]}
          onPress={() => setSex('MALE')}
        >
          <Text style={styles.sexButtonText}>Macho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sexButton, sex === 'FEMALE' && styles.selectedSexButton]}
          onPress={() => setSex('FEMALE')}
        >
          <Text style={styles.sexButtonText}>Fêmea</Text>
        </TouchableOpacity>
      </View>

      {/* Campo para o nome do pet */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Pet"
        value={name}
        onChangeText={setName}
      />

      {/* Campo para a raça do pet */}
      <TextInput
        style={styles.input}
        placeholder="Raça do Pet"
        value={breed}
        onChangeText={setBreed}
      />

      {/* Campo para a idade do pet */}
      <TextInput
        style={styles.input}
        placeholder="Idade do Pet"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      {/* Campo para o peso do pet */}
      <TextInput
        style={styles.input}
        placeholder="Peso do Pet"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      {/* Campo para observações sobre o pet */}
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Observações"
        value={observations}
        onChangeText={setObservations}
        multiline
      />

      {/* Botões de ação */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>SALVAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  sexLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  sexContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '100%',
  },
  sexButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedSexButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#999',
  },
  sexButtonText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#D9D9D9',
    borderWidth: 3,
    borderColor: 'rgba(99, 95, 95, 0.7)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#908989',
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
    shadowColor: 'rgba(12, 3, 65, 0.4)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Para Android
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0077b6',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PetForm;