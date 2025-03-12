import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedInputProps } from './ThemedInputDrops';

export const ThemedInput: React.FC<ThemedInputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style = {},
  placeholderTextColor,
  keyboardType = 'default', 
}) => {
  const strokeColor = useThemeColor({}, 'stroke');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <TextInput
      style={[styles.input, { borderColor: strokeColor, backgroundColor }, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      multiline={multiline}  
      numberOfLines={multiline ? 4 : 1} 
      textAlignVertical={multiline ? 'top' : 'center'}
      keyboardType={keyboardType} 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
});