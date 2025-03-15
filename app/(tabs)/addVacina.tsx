import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { ThemedInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const PersonForm = () => {
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<{ uri: string } | null>(null);
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({}); // Estado para armazenar mensagens de erro

  const selectImage = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Seleção cancelada', 'Você não selecionou nenhuma imagem.');
      } else if (response.errorMessage) {
        Alert.alert('Erro', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        if (response.assets[0].uri) {
          setImage({ uri: response.assets[0].uri });
        } else {
          Alert.alert('Erro', 'A URI da imagem está indefinida.');
        }
      }
    });
  };

  const formatDate = (text: string) => {
    let formattedText = text.replace(/\D/g, ''); // Remove tudo que não for número
    if (formattedText.length > 2) {
      formattedText = formattedText.replace(/^(\d{2})/, '$1/'); // Adiciona a barra após o dia
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.replace(/^(\d{2})\/(\d{2})/, '$1/$2/'); // Adiciona a barra após o mês
    }
    if (formattedText.length > 10) {
      formattedText = formattedText.substring(0, 10); // Limita o tamanho da data
    }
    return formattedText;
  };

  // Função para validar o Código NCM
  const validateNCM = (codigo: string) => {
    const ncmRegex = /^\d{8}$/; // Verifica se o código tem exatamente 8 dígitos
    return ncmRegex.test(codigo);
  };

  // Função para validar a Data
  const validateDate = (date: string) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Verifica o formato dd/MM/yyyy
    if (!dateRegex.test(date)) return false;

    // Verifica se a data é válida
    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };

  // Função para validar todos os campos
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validação do Código NCM
    if (!codigo.trim()) {
      newErrors.codigo = 'Por favor, insira o código NCM.';
    } else if (!validateNCM(codigo)) {
      newErrors.codigo = 'O código NCM deve ter 8 dígitos numéricos.';
    }

    // Validação da Data
    if (!date.trim()) {
      newErrors.date = 'Por favor, insira a data.';
    } else if (!validateDate(date)) {
      newErrors.date = 'Por favor, insira uma data válida no formato dd/MM/yyyy.';
    }

    setErrors(newErrors); // Atualiza o estado de erros

    // Retorna true se não houver erros
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com o salvamento do formulário
  const handleSave = () => {
    if (validateForm()) {
      Alert.alert('Salvo!', 'Dados salvos com sucesso.');
    }
  };

  // Componente reutilizável para exibir mensagens de erro
  const ErrorMessage = ({ error }: { error: string | undefined }) => {
    if (!error) return null; // Não exibe nada se não houver erro
    return <ThemedText style={styles.errorText}>{error}</ThemedText>;
  };

  return (
    <ThemedView style={styles.container}>
      {/* Círculo para a foto da pessoa */}
      <TouchableOpacity onPress={selectImage} style={styles.profileCircle}>
        {image ? (
          <Image source={image} style={styles.profileImage} />
        ) : (
          <ThemedText style={styles.placeholderText}>Adicionar Foto</ThemedText>
        )}
      </TouchableOpacity>

      {/* Campos do formulário com mensagens de erro */}
      <ThemedInput
        placeholder="Código NCM"
        value={codigo}
        onChangeText={(text) => {
          setCodigo(text);
          setErrors((prev) => ({ ...prev, codigo: '' })); // Limpa o erro ao digitar
        }}
        style={styles.input}
      />
      <ErrorMessage error={errors.codigo} />

      <ThemedInput
        placeholder="Data (dd/MM/yyyy)"
        value={date}
        onChangeText={(text) => {
          setDate(formatDate(text));
          setErrors((prev) => ({ ...prev, date: '' })); // Limpa o erro ao digitar
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <ErrorMessage error={errors.date} />

      {/* Botões de ação */}
      <ThemedButton onPress={handleSave} style={styles.button}>
        <ThemedText type="defaultSemiBold">SALVAR</ThemedText>
      </ThemedButton>
      <ThemedButton
        onPress={() => Alert.alert('Voltar', 'Voltando para a tela anterior.')}
        style={styles.button}
      >
        <ThemedText type="defaultSemiBold">VOLTAR</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
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
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    marginBottom: 5, // Reduzi o marginBottom para dar espaço à mensagem de erro
  },
  multilineInput: {
    height: 100,
  },
  button: {
    width: 166,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 3,
  },
  errorText: {
    color: 'red', // Cor vermelha para a mensagem de erro
    fontSize: 12,
    marginBottom: 10, // Espaçamento abaixo da mensagem de erro
  },
});

export default PersonForm;