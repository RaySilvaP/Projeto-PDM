import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o ícone de mapa

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
              // TAB HOME 
      <Tabs.Screen
        name="Index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
       // TAB EXPLORE 
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      // TAB PERFIL 
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />

      // TAB PETS 
      <Tabs.Screen
        name="ScMyPets/index"
        options={{
          title: 'PETS',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"paw" as any} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ScMaps/index"
        options={{
          title: 'MAPS',
          tabBarIcon: ({ color }) => <MaterialIcons name="map" size={28} color={color} />, // Ícone de mapa
        }}
      />
      // ScPetForms NÃO DEVE SER UMA TAB 
      <Tabs.Screen
        name="ScPetForms/index"
        options={{
          href: null, // Remove esta tela da tab bar
        }}
      />
      <Tabs.Screen
        name="PetDetails"
        options={{
          href: null, // Remove esta tela da tab bar
        }}
        />
      <Tabs.Screen
        name="addVacina"
        options={{
          title: "Adicionar Vacina",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="editarPerfil"
        options={{
          title: "Editar Perfil",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  
  );
}
