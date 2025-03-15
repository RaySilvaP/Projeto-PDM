import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { ThemedInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AlertModal, AlertModalHandle } from '@/components/AlertModal';
import { Picker } from '@react-native-picker/picker'; // Importe o Picker

const PersonForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<{ uri: string } | null>(null);
  const [sex, setSex] = useState(''); // Estado para o sexo
  const [errors, setErrors] = useState<Record<string, string>>({}); // Estado para armazenar mensagens de erro

  // Referência para o AlertModal
  const alertModalRef = useRef<AlertModalHandle>(null);

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

  // Função para formatar o CPF
  const formatCPF = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedText = text.replace(/\D/g, '');

    // Limita a 11 dígitos
    const limitedText = cleanedText.slice(0, 11);

    // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
    let formattedText = limitedText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    setCpf(formattedText);
  };

  // Função para formatar o telefone
  const formatPhone = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedText = text.replace(/\D/g, '');

    // Limita a 11 dígitos
    const limitedText = cleanedText.slice(0, 11);

    // Aplica a máscara de telefone ((XX) XXXXX-XXXX)
    let formattedText = limitedText.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    setPhone(formattedText);
  };

  // Função para validar CPF
  const validateCPF = (cpf: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato XXX.XXX.XXX-XX
    return cpfRegex.test(cpf);
  };

  // Função para validar Email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato básico de email
    return emailRegex.test(email);
  };

  // Função para validar Telefone
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX
    return phoneRegex.test(phone);
  };

  // Função para validar todos os campos
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Por favor, insira um nome.';
    if (!email.trim()) newErrors.email = 'Por favor, insira um email.';
    if (!phone.trim()) newErrors.phone = 'Por favor, insira um telefone.';
    if (!cpf.trim()) newErrors.cpf = 'Por favor, insira um CPF.';
    if (!address.trim()) newErrors.address = 'Por favor, insira um endereço.';
    if (!sex.trim()) newErrors.sex = 'Por favor, selecione o sexo.';

    // Validações específicas
    if (email && !validateEmail(email)) {
      newErrors.email = 'Por favor, insira um email válido.';
    }
    if (phone && !validatePhone(phone)) {
      newErrors.phone = 'Por favor, insira um telefone válido.';
    }
    if (cpf && !validateCPF(cpf)) {
      newErrors.cpf = 'Por favor, insira um CPF válido.';
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
    if (!error) return null;
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

      {/* Dropdown para seleção de sexo */}
      <View style={styles.sexContainer}>
        <Picker
          selectedValue={sex}
          onValueChange={(itemValue) => setSex(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
        <ErrorMessage error={errors.sex} />
      </View>

      {/* Campos do formulário com mensagens de erro */}
      <ThemedInput
        placeholder="Nome"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors((prev) => ({ ...prev, name: '' }));
        }}
        style={styles.input}
      />
      <ErrorMessage error={errors.name} />

      <ThemedInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prev) => ({ ...prev, email: '' }));
        }}
        keyboardType="email-address"
        style={styles.input}
      />
      <ErrorMessage error={errors.email} />

      <ThemedInput
        placeholder="Telefone"
        value={phone}
        onChangeText={formatPhone} // Aplica a máscara de telefone
        keyboardType="phone-pad"
        maxLength={15} // Limite de caracteres com máscara
        style={styles.input}
      />
      <ErrorMessage error={errors.phone} />

      <ThemedInput
        placeholder="CPF"
        value={cpf}
        onChangeText={formatCPF} // Aplica a máscara de CPF
        keyboardType="numeric"
        maxLength={14} // Limite de caracteres com máscara
        style={styles.input}
      />
      <ErrorMessage error={errors.cpf} />

      <ThemedInput
        placeholder="Endereço"
        value={address}
        onChangeText={(text) => {
          setAddress(text);
          setErrors((prev) => ({ ...prev, address: '' }));
        }}
        multiline
        style={[styles.input, styles.multilineInput]}
      />
      <ErrorMessage error={errors.address} />

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

      {/* Modal de alerta para nome vazio */}
      <AlertModal
        ref={alertModalRef}
        text="Por favor, insira um nome."
        type="fail"
      />
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
    marginBottom: 5,
  },
  multilineInput: {
    height: 100,
  },
  button: {
    width: 166,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  sexContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  picker: {
    width: 150,
    height: 50,
  },
});

export default PersonForm;