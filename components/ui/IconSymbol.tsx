import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Mapeamento de SF Symbols para MaterialIcons
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'person.fill': 'person-outline',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'arrow.left': 'arrow-back',
  'checkmark': 'done-all',
  'xmark': 'clear',
  'paw': 'pets', // Mapeamento para o ícone "paw"
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * Um componente de ícone que usa MaterialIcons no Android e web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>; // Alterado para TextStyle
  weight?: SymbolWeight;
}) {
  const materialIconName = MAPPING[name];
  if (!materialIconName) {
    console.warn(`Ícone "${name}" não mapeado para MaterialIcons.`);
    return null;
  }

  return (
    <MaterialIcons
      name={materialIconName}
      size={size}
      color={color}
      style={style} // Estilo compatível com TextStyle
    />
  );
}