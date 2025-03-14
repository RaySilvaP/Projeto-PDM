import React, { useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import  ParallaxScrollView  from '@/components/ParallaxScrollView';
import { AlertModal, AlertModalHandle } from '@/components/AlertModal';

const PetProfile = () => {
  const alertModalRef = useRef<AlertModalHandle>(null);

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          style={styles.headerImage}
        />
      }
      headerBackgroundColor={{ light: '#ECECEC', dark: '#1C1C1C' }}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContent}>
          <ThemedText type="title" style={styles.petName}>
            LUPI
          </ThemedText>
          <ThemedText type="subtitle" style={styles.petCity}>
            CAJAZEIRAS PB
          </ThemedText>
        </ThemedView>

        {/* Seção de Vacinas e Informações do Pet */}
        <ThemedView style={styles.infoSection}>
          {/* Seção de Vacinas (à esquerda) */}
          <ThemedView style={styles.vaccinesContainer}>
            <ThemedView style={styles.vaccinesBackground} />
            <ThemedText style={styles.vaccinesText}>
              Vacinas NCM 30023010 30023050 30023070
            </ThemedText>
            <TouchableOpacity style={styles.addButton}>
              <Image
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Seção de Informações do Pet (à direita) */}
          <ThemedView style={styles.infoContainer}>
            <ThemedText type="defaultSemiBold" style={styles.infoText}>
              IDADE: 4 ANOS
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.infoText}>
              RAÇA: HUSKY S.
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.infoText}>
              TAMANHO: 1,3 m
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.infoText}>
              PESO: 15 KG
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Área de Observações */}
        <ThemedView style={styles.observationsContainer}>
          <ThemedText type="defaultSemiBold" style={styles.observationsTitle}>
            OBSERVAÇÕES
          </ThemedText>
          <ThemedText style={styles.observationsText}>
            Aqui vão as observações sobre o pet.
          </ThemedText>
        </ThemedView>

        {/* Botões de Ação */}
        <ThemedButton
          onPress={() => alertModalRef.current?.setVisible()}
          style={styles.button}
        >
          <ThemedText type="defaultSemiBold">VOLTAR</ThemedText>
        </ThemedButton>

        {/* Modal de Alerta */}
        <AlertModal
          ref={alertModalRef}
          text="Operação realizada com sucesso!"
          type="success"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  petName: {
    fontSize: 40,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  petCity: {
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5,
  },
  infoSection: {
    flexDirection: 'row', // Coloca as seções lado a lado
    justifyContent: 'space-between', // Espaço entre as seções
    marginTop: 20,
  },
  vaccinesContainer: {
    backgroundColor: '#0B054C',
    borderRadius: 10,
    padding: 20,
    width: '48%', // Largura da seção de vacinas
    position: 'relative', // Para posicionar o botão "ADD"
  },
  vaccinesBackground: {
    position: 'absolute',
    width: 82,
    height: 147,
    backgroundColor: '#0B054C',
    opacity: 0.4,
    borderRadius: 10,
    transform: [{ rotate: '90deg' }],
    top: 10,
    left: 50,
  },
  vaccinesText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
    textIndent: '5px',
    fontVariant: ['small-caps'],
  },
  addButton: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    right: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addIcon: {
    width: 20,
    height: 20,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '48%', // Largura da seção de informações
  },
  infoText: {
    fontSize: 20,
    marginBottom: 10,
  },
  observationsContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  observationsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  observationsText: {
    fontSize: 16,
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default PetProfile;