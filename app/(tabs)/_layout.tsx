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
    </Tabs>
  
  );
}
